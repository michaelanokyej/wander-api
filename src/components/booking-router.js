const express = require("express");
const path = require("path");
const xss = require("xss");
const bookingRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");
const bookingService = require("./booking-service");
const guideService = require("./guide-service");
const { getBookingValidationError } = require("./booking-validator");

const serializebooking = booking => ({
  id: xss(booking.id),
  tour_id: xss(booking.tour_id),
  tour_name: xss(booking.tour_name),
  user_id: xss(booking.user_id),
  guide_id: xss(booking.guide_id),
  checkin: xss(booking.checkin),
  checkout: xss(booking.checkout),
  posted: xss(booking.posted)
});

bookingRouter
  .route("/")

  .get((req, res, next) => {
    bookingService
      .getAllbookings(req.app.get("db"))
      .then(bookings => {
        res.json(bookings.map(serializebooking));
      })
      .catch(next);
  })

  .post(bodyParser, (req, res, next) => {
    const {
      tour_id,
      tour_name,
      user_id,
      guide_id,
      checkin,
      checkout
    } = req.body;
    const newBooking = {
      tour_id,
      tour_name,
      user_id,
      guide_id,
      checkin,
      checkout
    };


    for (const field of [
      "tour_id",
      "tour_name",
      "user_id",
      "guide_id",
      "checkin",
      "checkout"
    ]) {
      if (!newBooking[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }
   
    const error = getBookingValidationError(newBooking);

    if (error) return res.status(400).send(error);

        bookingService
          .insertBooking(req.app.get("db"), newBooking)
          .then(booking => {
            logger.info(`booking with id ${booking.id} created.`);
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${booking.id}`))
              .json(serializebooking(booking));
          })
          .catch(next);
      });

bookingRouter
  .route("/:booking_id")

  .all((req, res, next) => {
    const { booking_id } = req.params;
    bookingService
      .getById(req.app.get("db"), booking_id)
      .then(booking => {
        if (!booking) {
          logger.error(`booking with id ${booking_id} not found.`);
          return res.status(404).json({
            error: { message: `booking Not Found` }
          });
        }

        res.booking = booking;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    res.json(serializebooking(res.booking));
  })

  .delete((req, res, next) => {
    const { booking_id } = req.params;
    bookingService
      .deletebooking(req.app.get("db"), booking_id)
      .then(numRowsAffected => {
        logger.info(`booking with id ${booking_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    const { name, description, policies } = req.body;
    const bookingToUpdate = { name, description, policies };

    const numberOfValues = Object.values(bookingToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`);
      return res.status(400).json({
        error: {
          message: `Request body must content either 'name', 'description', or 'policies'`
        }
      });
    }

    const error = getBookingValidationError(bookingToUpdate);

    if (error) return res.status(400).send(error);

    bookingService
      .updatebooking(req.app.get("db"), req.params.id, bookingToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = bookingRouter;
