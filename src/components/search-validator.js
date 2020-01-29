// const { isWebUri } = require('valid-url')
const logger = require('../logger')

const NO_ERRORS = null

function getSearchValidationError({ city, state }) {

  if (!city) {
    logger.error(`No city supplied`)
    return {
      error: {
        message: `City must be entered`
      }
    }
  }else if (!state) {
    logger.error(`No state supplied`)
    return {
      error: {
        message: `State must be entered`
      }
    }
  }
}

module.exports = {
  getSearchValidationError
}