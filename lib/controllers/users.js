const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const token = await UserService.signUp(req.body);
      console.log('token', token);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Successfully logged in with new account!' });
      res.json(token);
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      // const { email, password } = req.body; <<<<< what is this here for?
      const sessionToken = await UserService.signIn(req.body);
      console.log('sessiontoken from /sessions', sessionToken);
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Welcome to the Rodeo! You are all signed in.' });
      console.log('res.cookie', res.cookie);
    } catch (e) {
      next(e);
    }
  });
