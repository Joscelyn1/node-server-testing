const express = require('express');

const Pokemon = require('../pokemon/pokemon-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/pokemon', (req, res) => {
  Pokemon.getAll()
    .then(pokemon => {
      res.status(200).json(pokemon);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = server;
