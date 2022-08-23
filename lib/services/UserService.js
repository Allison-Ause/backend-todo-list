const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

module.exports = class UserService {
  static async signUp({ firstName, lastName, email, password }) {
    console.log('password.length', password.length);
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await Users.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await Users.getByEmail(email);

      if (!user) throw new Error('Invalid Email; Try Again, Cowboy.');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid Password. Crack that code!');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      console.log('TOKEN FROM SIGNIN', token);

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
