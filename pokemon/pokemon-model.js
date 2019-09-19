const db = require('../data/db-config.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(pokemon) {
  return db('pokemon').insert(pokemon, 'id');
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('pokemon');
}

function findById(id) {
  return null;
}
