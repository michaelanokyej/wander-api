const express = require("express");
const path = require('path')
const xss = require('xss')
const tourRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
const tourService = require("./tour-service");
const { getTourValidationError } = require('./tour-validator');

const serializetour = tour => ({
  name: xss(tour.name),
  city: xss(tour.city),
  state: xss(tour.state),
  img: xss(tour.img),
  description: xss(tour.description),
  max_tourists: xss(tour.max_tourists),
  policies: xss(tour.policies),
  guide_username: xss(tour.guide_username),
  guide_id: xss(tour.guide_id)
})

tourRouter
  .route('/')

  .get((req, res, next) => {
    tourService.getAllTours(req.app.get('db'))
      .then(tours => {
        res.json(tours.map(serializetour))
      })
      .catch(next)
  })
  // Ask about unauthorized request and how to use set for tokens 

  .post(bodyParser, (req, res, next) => {
    const { name, city, state, img, description, max_tourists, policies, guide_username } = req.body
    let newtour = { name, city, state, img, description, max_tourists, policies, guide_username }

    for (const field of ['name', 'city', 'state', 'img', 'description', 'max_tourists', 'policies', 'guide_username' ]) {
      if (!newtour[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }
    let guideId;
    const error = getTourValidationError(newtour)

    if (error) return res.status(400).send(error)

    tourService.getByGuideUsername (
      req.app.get('db'),
      newtour.guide_username
    )
      .then(guide => {
        console.log(guide)
        const guideId = guide.id
        newtour.guide_id = guideId;
        console.log("updated tour", newtour)
        return newtour;
      }).then(newtour => {
    tourService.insertTour(
      req.app.get('db'),
      newtour
    )
      .then(tour => {
        console.log("Posted tour", tour)
        logger.info(`tour with id ${tour.id} created.`)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${tour.id}`))
          .json(serializetour(tour))
      })
      .catch(next)
    })})


tourRouter
  .route('/:tour_id')

  .all((req, res, next) => {
    const { tour_id } = req.params
    tourService.getById(req.app.get('db'), tour_id)
      .then(tour => {
        if (!tour) {
          logger.error(`tour with id ${tour_id} not found.`)
          return res.status(404).json({
            error: { message: `tour Not Found` }
          })
        }

        res.tour = tour
        next()
      })
      .catch(next)

  })

  .get((req, res) => {
    res.json(serializetour(res.tour))
  })

  .delete((req, res, next) => {
    const { tour_id } = req.params
    tourService.deletetour(
      req.app.get('db'),
      tour_id
    )
      .then(numRowsAffected => {
        logger.info(`tour with id ${tour_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(bodyParser, (req, res, next) => {
    const { name, description, policies } = req.body
    const tourToUpdate = { name, description, policies }

    const numberOfValues = Object.values(tourToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'name', 'description', or 'policies'`
        }
      })
    }

    const error = getTourValidationError(tourToUpdate)

    

    if (error) return res.status(400).send(error)

    tourService.updateTour(
      req.app.get('db'),
      req.params.id,
      tourToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = tourRouter;
