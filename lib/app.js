const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5501'],
    credentials: true,
  })
);
app.use('/api/v1/users', require('./controllers/users'));
// !! add authenticate to all todos routes from here !!

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
