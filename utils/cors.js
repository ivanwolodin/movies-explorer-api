const { CorsError } = require('../errors/CorsError');

const whitelist = [
  'http://localhost:3000/',
  'http://frontend15.nomoredomains.xyz',
  'https://frontend15.nomoredomains.xyz',
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
