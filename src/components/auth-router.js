const express = require("express");
const path = require('path')
const xss = require('xss')
const authRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
// const authService = require("./auth-service");
const userService = require("./user-service");
const { getAuthValidationError } = require('./auth-validator');
const jwt = require('jsonwebtoken');

const serializeauth = auth => ({
  id: auth.id,
  f_name: xss(auth.f_name),
  l_name: xss(auth.l_name),
  email: xss(auth.email),
  password: xss(auth.password),
})



authRouter
  .route('/login')

  .post(bodyParser, (req, res, next) => {
    const { email, password } = req.body
    const user = { email, password }

    for (const field of [ 'email', 'password' ]) {
      if (!user[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

    const error = getAuthValidationError(user)


    if (error) return res.status(400).send(error)

    userService.getByGuideUsername (
      req.app.get('db'),
      user.email
    )
      .then(verifiedUser => {
        console.log("res line 48", res)
        if (verifiedUser.password !== user.password) {
          res.send('Err: User not found, please verify password')
        }
      }).then(user => {
        
        jwt.sign({user}, 'secretkey', (err, token) => {
          res.json({
            token
          })
        })
    // userService.insertTour(
    //   req.app.get('db'),
    //   newtour
      })
      // .then(tour => {
      //   // console.log("Posted tour", tour)
      //   logger.info(`tour with id ${tour.id} created.`)
      //   res
      //     .status(201)
      //     .location(path.posix.join(req.originalUrl, `/${tour.id}`))
      //     .json(serializetour(tour))
      // })
      .catch(next)
    })

    //Format of token
    //Authorization: Bearer <access token>

    // Verify token
    function verifyToken(req, res, next) {
      // Get auth header value 
      const bearerHeader = req.headers['authorization'];
      // check if bearer is undefined
      // Check if bearer is undefined 
      if (typeof bearerHeader !== 'undefined') {
        // split at the space 
        const bearer = bearerHeader.split(' ');
        // Get token from array 
        const bearerToken = bearer[1];
        // set the token 
        req.token = bearerToken;
        // Set next middleware 
        next()
      
      }else {
        // Forbidden
        res.sendStatus(403)
      }
    }



  module.exports = authRouter;
