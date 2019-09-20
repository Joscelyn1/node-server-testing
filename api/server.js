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
      Pokemon.find(req.body.name)
        .then(response => {
          res.status(201).json(response[0]);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting pokemon' });
    });
});

server.delete('/pokemon/:name', (req, res) => {
  const name = req.params.name;

  if (!name) {
    return res.status(400).json({ error: 'Need name' });
  }

  Pokemon.remove(name)
    .then(response => {
      if (response) {
        console.log(response);
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: "couldn't find a pokemon with that name" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting pokemon' });
    });
});

server.get('/pokemon/:name', (req, res) => {
  const name = req.params.name;

  Pokemon.find(name)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error finding pokemon' });
    });
});

module.exports = server;
