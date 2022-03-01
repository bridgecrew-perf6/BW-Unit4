// Imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/users-router');
const recipesRouter = require('./recipes/recipes-router');

// Server
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// Routers
server.use('/api/users', usersRouter);
server.use('/api/recipes', recipesRouter);

// Global error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customError: 'Houston, we have a problem.',
    message: err.message,
    stack: err.stack
  });
});

// Exports
module.exports = server;
