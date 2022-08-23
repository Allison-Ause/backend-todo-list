const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    console.log('req.cookies inaccurate', req.cookies);
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('Sign in to view');
    console.log('cookie from auth', cookie);
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
