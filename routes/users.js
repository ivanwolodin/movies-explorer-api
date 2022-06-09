const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo,
  getMe,
} = require('../controllers/users');

router.get('/users/me', getMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = router;
