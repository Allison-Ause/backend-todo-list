const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todos = require('../models/Todos');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Todos.getAllTodos(req.user.id);

      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        user_id: req.user.id,
      };
      console.log('data from post', data);
      const newItem = await Todos.addTodo(data);
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  });
