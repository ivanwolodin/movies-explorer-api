const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const User = require('../models/user');
const {
  CAST_ERROR,
} = require('../utils/utils');

const { ConflictError } = require('../errors/ConflictError');

module.exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    if (!me) {
      next(new NotFoundError('Нет такого пользователя'));
    }
    res.send({ email: me.email, name: me.name });
  } catch (e) {
    if (e.name === CAST_ERROR) {
      next(new BadRequestError('Некорректный id пользователя'));
    }
    next(e);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    }
    res.send({ user });
  } catch (e) {
    if (e.codeName === 'DuplicateKey') {
      next(new ConflictError());
    }
    next(e);
  }
};
