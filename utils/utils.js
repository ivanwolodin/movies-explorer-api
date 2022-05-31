require('dotenv').config();

const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';

const VALIDATION_ERROR_CODE = 400;
const AUTHENTICATION_ERROR_CODE = 401;
const UNAUTHORIZED_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const DATABASE_ERROR_CODE = 409;

const MONGO_DB_DUPLICATE_EMAIL_CODE = 11000;

const { JWT_TOKEN = 'secret_code' } = process.env.JWT_TOKEN;

const REGEX_MAIL_CHECK = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

module.exports = {
  VALIDATION_ERROR_CODE,
  CAST_ERROR,
  VALIDATION_ERROR,
  AUTHENTICATION_ERROR_CODE,
  JWT_TOKEN,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DATABASE_ERROR_CODE,
  MONGO_DB_DUPLICATE_EMAIL_CODE,
  REGEX_MAIL_CHECK,
};
