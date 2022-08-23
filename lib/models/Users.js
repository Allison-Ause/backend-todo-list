const pool = require('../utils/pool');

module.exports = class Users {
  id;
  first_name;
  last_name;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  //build out .insert function for signup

  //build out .getByEmail function for signin
};
