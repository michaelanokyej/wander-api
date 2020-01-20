// const { isWebUri } = require('valid-url')
const logger = require('../logger')

const NO_ERRORS = null

function getTourValidationError({ name, city, state, img, description, policies, guide_username }) {
  const include_flag = guide_username.split("").includes("@");

  if (!name) {
    logger.error(`Invalid  name '${name}' supplied`)
    return {
      error: {
        message: `'Tour name' must be entered`
      }
    }
  }else if (!city) {
    logger.error(`Invalid city '${city}' supplied`)
    return {
      error: {
        message: `'Tour city' must be entered`
      }
    }
  }else if (!state) {
    logger.error(`Invalid state '${state}' supplied`)
    return {
      error: {
        message: `'Tour state' must be entered`
      }
    }
  }else if (!img) {
    logger.error(`Invalid tour image '${img}' supplied`)
    return {
      error: {
        message: `'Tour image' must be entered`
      }
    }
  }else if (!policies) {
    logger.error(`Invalid tour policies '${policies}' supplied`)
    return {
      error: {
        message: `'Tour policies' must be entered`
      }
    }
  }else if (!include_flag) {
    logger.error(`Invalid guide_username '${guide_username}' supplied`)
    return {
      error: {
        message: `'A valid guide_username' must be entered`
      }
    }
  }else if (!description) {
    logger.error(`Invalid tour description '${description}' supplied`)
    return {
      error: {
        message: `'Tour description' must be entered`
      }
    }
  }
}

module.exports = {
  getTourValidationError,
}