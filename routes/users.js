const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo,
  getMe,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;
