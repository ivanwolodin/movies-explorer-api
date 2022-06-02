const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { PrivilegeError } = require('../errors/PrivilegeError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send({ movies });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      next(new NotFoundError('Нет фильма с таким id'));
    }
    if (movie.owner.toString() !== req.user._id) {
      next(new PrivilegeError());
    }
    const movieData = await Movie.findByIdAndRemove(req.params.movieId);
    res.send({ data: movieData });
  } catch (e) {
    next(e);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    if (!country || !director
      || !duration || !year || !description
      || !image || !trailerLink || !nameRU
      || !nameEN || !thumbnail || !movieId) {
      next(new BadRequestError('Не передано одно из полей'));
    }
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    if (!movie) {
      next(new BadRequestError('Не удалось создать фильм'));
    }
    res.send({ movie });
  } catch (e) {
    next(e);
  }
};
