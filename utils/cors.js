const { CorsError } = require('../errors/CorsError');

const whitelist = [
  'http://localhost:3000/',
  'https://diploma.iwol.nomoreparties.sbs',
  'https://diploma.iwol.nomoreparties.sbs',
  'http://diploma.iwol.nomoreparties.sbs',
  'http://diploma.iwol.nomoreparties.sbs'
];

module.exports.corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new CorsError('Not allowed by CORS'));
    }
  },
};
