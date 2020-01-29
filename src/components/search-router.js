const express = require("express");
const path = require('path')
const xss = require('xss')
const searchRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
const tourService = require("./tour-service");
const { getSearchValidationError } = require('./search-validator');

const serializetour = tour => ({
  id: xss(tour.id),
  name: xss(tour.name),
  city: xss(tour.city),
  state: xss(tour.state),
  img: xss(tour.img),
  description: xss(tour.description),
  max_tourists: xss(tour.max_tourists),
  policies: xss(tour.policies),
  guide_username: xss(tour.guide_username),
  guide_id: xss(tour.guide_id),
  posted: xss(tour.posted)
})

searchRouter
  .route('/tours')

  .post(bodyParser, (req, res, next) => {
    const { city, state } = req.body
    let searchParams = { city, state }

    for (const field of [ 'city', 'state' ]) {
      if (!searchParams[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }
    const error = getSearchValidationError(searchParams)

    if (error) return res.status(400).send(error)

    tourService.getBySearchTerm (
      req.app.get('db'),
      searchParams.city,
      searchParams.state
    )
      .then(tours => {
        
        res.json(tours)
      })
    //   .then(newtour => {
    // tourService.insertTour(
    //   req.app.get('db'),
    //   newtour
    // )
    //   .then(tour => {
    //     // console.log("Posted tour", tour)
    //     logger.info(`tour with id ${tour.id} created.`)
    //     res
    //       .status(201)
    //       .location(path.posix.join(req.originalUrl, `/${tour.id}`))
    //       .json(serializetour(tour))
    //   })
      .catch(next)
    })

  module.exports = searchRouter;
