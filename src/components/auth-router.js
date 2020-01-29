const express = require("express");
const path = require("path");
const xss = require("xss");
const authRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
const userService = require("./user-service");
const { getAuthValidationError } = require("./auth-validator");
const jwt = require("jsonwebtoken");

const serializeauth = auth => ({
  id: auth.id,
  firstName: xss(auth.f_name),
  lastName: xss(auth.l_name),
  userName: xss(auth.email)
});

authRouter
  .route("/")

  .post(bodyParser, (req, res, next) => {
    const { userName } = req.body;
    const user = { userName };

    for (const field of ["userName"]) {
      if (!user[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }

    userService
      .getByGuideUsername(req.app.get("db"), user.userName)
      .then(verifiedUser => {
        res.json(serializeauth(verifiedUser));
      })
      .catch(next);
  });

authRouter
  .route("/login")

  .post(bodyParser, (req, res, next) => {
    const { email, password } = req.body;
    const user = { email, password };

    for (const field of ["email", "password"]) {
      if (!user[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }

    const error = getAuthValidationError(user);

    if (error) return res.status(400).send(error);

    userService
      .getByGuideUsername(req.app.get("db"), user.email)
      .then(verifiedUser => {
        if (verifiedUser.password !== user.password) {
          res.send("Err: User not found, please verify password");
        }
      })
      .then(user => {
        jwt.sign({ user }, "secretkey", (err, token) => {
          res.json({
            token
          });
        });
      })
      .catch(next);
  });

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = authRouter;
