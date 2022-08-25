const pool = require('../utils/pool');

module.exports = class Todos {
  id;
  user_id;
  item;
  bought;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.item = row.item;
    this.bought = row.bought;
    this.created_at = row.created_at;
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

  static async addTodo({ item, user_id }) {
    const { rows } = await pool.query(
      `
    INSERT INTO todos (item, user_id)
    VALUES ($1, $2)
    RETURNING *

      `,
      [item, user_id]
    );
    return new Todos(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM todos
    WHERE id = $1`,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    console.log('ROWS FROM GETBYID', rows);
    return new Todos(rows[0]);
  }

  static async updateTodo(id, props) {
    console.log('ID & PROPS put in', id, props);
    const todo = await Todos.getById(id);
    if (!todo) return null;
    const { bought } = { ...todo, ...props };
    console.log('BOUGHT', bought);
    const { rows } = await pool.query(
      `
    UPDATE todos
    SET bought = $2
    WHERE id = $1
    RETURNING *
    `,
      [id, bought]
    );
    console.log('ROWS FROM UPDATE', rows);
    return new Todos(rows[0]);
  }
};
