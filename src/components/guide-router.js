const express = require("express");
const path = require("path");
const xss = require("xss");
const guideRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
const guideService = require("./guide-service");
const { getguideValidationError } = require("./guide-validator");
const jwt = require("jsonwebtoken");

const serializeguide = guide => ({
  id: guide.id,
  guidename: xss(guide.guidename),
  f_name: xss(guide.f_name),
  l_name: xss(guide.l_name),
  email: xss(guide.email),
  password: xss(guide.password)
});

guideRouter
  .route("/")

  .get((req, res, next) => {
    guideService
      .getAllguides(req.app.get("db"))
      .then(guides => {
        res.json(guides.map(serializeguide));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { f_name, l_name, email, guidename, password } = req.body;
    const newguide = { f_name, l_name, email, guidename, password };

    for (const field of ["f_name", "l_name", "email", "guidename", "password"]) {
      if (!newguide[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }

    const error = getguideValidationError(newguide);

    if (error) return res.status(400).send(error);

    guideService
      .insertguide(req.app.get("db"), newguide)
      .then(guide => {
        logger.info(`guide with id ${guide.id} created.`);
        res.status(201).json(serializeguide(guide));
      })
      .catch(next);
  });

guideRouter
  .route("/:guide_id")

  .all((req, res, next) => {
    const { guide_id } = req.params;
    guideService
      .getById(req.app.get("db"), guide_id)
      .then(guide => {
        if (!guide) {
          logger.error(`guide with id ${guide_id} not found.`);
          return res.status(404).json({
            error: { message: `guide Not Found` }
          });
        }

        res.guide = guide;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    res.json(serializeguide(res.guide));
  })

  .delete((req, res, next) => {
    const { guide_id } = req.params;
    guideService
      .deleteguide(req.app.get("db"), guide_id)
      .then(numRowsAffected => {
        logger.info(`guide with id ${guide_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    const { f_name, l_name, email, password } = req.body;
    const guideToUpdate = { f_name, l_name, email, password };

    const numberOfValues = Object.values(guideToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`);
      return res.status(400).json({
        error: {
          message: `Request body must content either 'guide_name', 'folder_id', or 'content'`
        }
      });
    }

    const error = getguideValidationError(guideToUpdate);

    if (error) return res.status(400).send(error);

    guideService
      .updateguide(req.app.get("db"), req.params.guide_id, guideToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = guideRouter;
