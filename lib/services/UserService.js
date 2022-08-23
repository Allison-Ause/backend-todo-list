const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

module.exports = class UserService {
  static async signUp({ email, password }) {
    if (password.length < 6) {
      throw new Error('Password must be longer than 6 characters.');
    }
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);

      if (!user) throw new Error('Invalid Email; Try Again, Cowboy.');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid Password. Crack that code!');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
