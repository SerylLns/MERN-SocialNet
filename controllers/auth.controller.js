const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, logInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = signUpErrors(error)
    res.status(200).send({ errors }); 
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = logInErrors(error);
    res.status(200).send({ errors }); 
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}