// const { isWebUri } = require('valid-url')
const logger = require('../logger')

const NO_ERRORS = null

function getUserValidationError({ f_name, l_name, email, password }) {
  const include_flag = email.split("").includes("@");

  if (!f_name) {
    logger.error(`Invalid first name '${f_name}' supplied`)
    return {
      error: {
        message: `'first name' must be entered`
      }
    }
  }else if (!l_name) {
    logger.error(`Invalid first name '${l_name}' supplied`)
    return {
      error: {
        message: `'last name' must be entered`
      }
    }
  }else if (!include_flag) {
    logger.error(`Invalid email '${email}' supplied`)
    return {
      error: {
        message: `'A valid email' must be entered`
      }
    }
  }else if (!password) {
    logger.error(`Invalid first name '${password}' supplied`)
    return {
      error: {
        message: `'password' must be entered`
      }
    }
  }
}

module.exports = {
  getUserValidationError,
}