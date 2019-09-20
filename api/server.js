const express = require('express');

const Pokemon = require('../pokemon/pokemon-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/pokemon', (req, res) => {
  Pokemon.find()
    .then(pokemon => {
      res.status(200).json(pokemon);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

server.post('/pokemon', (req, res) => {
  const { type, pokedexNumber, name } = req.body;

  if (!type || !pokedexNumber || !name) {
    return res
      .status(400)
      .json({ error: 'Need type, pokedexNumber, and name' });
  }

  Pokemon.insert({ type, pokedexNumber, name })
    .then(response => {
      res.status(201).json(response[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting pokemon' });
    });
});

server.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Need id' });
  }

  Pokemon.remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting pokemon' });
    });
});

module.exports = server;
