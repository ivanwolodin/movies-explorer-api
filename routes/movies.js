const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');
// const { REGEX_MAIL_CHECK } = require('../utils/utils');

router.get('/movies', getMovies);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovieById);

router.post('/movies', celebrate({
  params: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.string(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    trailerLink: Joi.string(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string(),
    movieId: Joi.string().length(24).hex(),
  }),
}), createMovie);

module.exports = router;
