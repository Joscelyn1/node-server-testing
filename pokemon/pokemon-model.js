const db = require('../data/db-config.js');

module.exports = {
  insert,
  remove,
  find
};

async function insert(pokemon) {
  return db('pokemon').insert(pokemon, 'id');
}

function remove(id) {
  return db('pokemon')
    .where('id', id)
    .del();
}

function find() {
  return db('pokemon');
}
