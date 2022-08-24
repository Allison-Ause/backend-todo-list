const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todos = require('../models/Todos');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const data = await Todos.getAllTodos(req.user.d);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
