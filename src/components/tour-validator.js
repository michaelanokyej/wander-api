const logger = require("../logger");

const NO_ERRORS = null;

function getTourValidationError({
  name,
  city,
  state,
  img,
  description,
  policies,
  guide_username,
  guide_email,
  guide_id
}) {
  const include_flag = guide_email.split("").includes("@");

  if (!name) {
    logger.error(`Invalid  name '${name}' supplied`);
    return {
      error: {
        message: `'Tour name' must be entered`
      }
    };
  } else if (!city) {
    logger.error(`Invalid city '${city}' supplied`);
    return {
      error: {
        message: `'Tour city' must be entered`
      }
    };
  } else if (!state) {
    logger.error(`Invalid state '${state}' supplied`);
    return {
      error: {
        message: `'Tour state' must be entered`
      }
    };
  } else if (!img) {
    logger.error(`Invalid tour image '${img}' supplied`);
    return {
      error: {
        message: `'Tour image' must be entered`
      }
    };
  } else if (!policies) {
    logger.error(`Invalid tour policies '${policies}' supplied`);
    return {
      error: {
        message: `'Tour policies' must be entered`
      }
    };
  }
   else if (!include_flag) {
    logger.error(`Invalid guide email '${guide_email}' supplied`);
    return {
      error: {
        message: `'A valid guide' must be entered`
      }
    };
  } 
  if (!guide_username) {
    logger.error(`Invalid  guide username '${guide_username}' supplied`);
    return {
      error: {
        message: `'guide username' must be entered`
      }
    };
  }
  if (!guide_id) {
    logger.error(`Invalid  guide ID '${guide_id}' supplied`);
    return {
      error: {
        message: `'guide ID' must be entered`
      }
    };
  }
  else if (!description) {
    logger.error(`Invalid tour description '${description}' supplied`);
    return {
      error: {
        message: `'Tour description' must be entered`
      }
    };
  }
}

module.exports = {
  getTourValidationError
};
