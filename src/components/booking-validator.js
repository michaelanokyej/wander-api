const logger = require("../logger");

const NO_ERRORS = null;

function getBookingValidationError({
  tour_id,
      tour_name,
      user_id,
      guide_id,
      checkin,
      checkout
}) {

  if (!tour_name) {
    logger.error(`Invalid  tour name '${tour_name}' supplied`);
    return {
      error: {
        message: `'Tour name' must be entered`
      }
    };
  } else if (!user_id) {
    logger.error(`Invalid user ID '${user_id}' supplied`);
    return {
      error: {
        message: `'User ID' must be entered`
      }
    };
  } else if (!checkin) {
    logger.error(`Invalid check in '${checkin}' supplied`);
    return {
      error: {
        message: `'Check in Date' must be entered`
      }
    };
  } else if (!checkout) {
    logger.error(`Invalid check out '${checkout}' supplied`);
    return {
      error: {
        message: `'Check out Date' must be entered`
      }
    };
  } else if (!guide_id) {
    logger.error(`Invalid  guide ID '${guide_id}' supplied`);
    return {
      error: {
        message: `'guide ID' must be entered`
      }
    };
  }
}

module.exports = {
  getBookingValidationError
};
