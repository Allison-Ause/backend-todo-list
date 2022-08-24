const pool = require('../utils/pool');

module.exports = class Todos {
  id;
  user_id;
  item;
  bought;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.item = row.item;
    this.bought = row.bought;
  }

  static async getAllTodos(user_id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM todos
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
      [user_id]
    );
    return rows.map((todo) => new Todos(todo));
  }
};
