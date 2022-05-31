const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');
// const { REGEX_MAIL_CHECK } = require('../utils/utils');

router.get('/', getMovies);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteMovieById);

router.post('/', createMovie);

module.exports = router;
