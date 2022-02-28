// Imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db-config');
const recipesRouter = require('./recipes/recipes-router');

function getAllUsers() { return db('users') };

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password']);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
};

// Server
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/recipes', recipesRouter);

// User endpoints
server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers());
});

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

// Global error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customError: 'Houston, we have a problem.',
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
