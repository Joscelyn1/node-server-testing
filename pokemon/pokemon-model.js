const db = require('../data/db-config.js');

module.exports = {
  insert,
  remove,
  find
};

async function insert(pokemon) {
  return db('pokemon').insert(pokemon, 'id');
}

function remove(name) {
  return db('pokemon')
    .where('name', name)
    .del();
}

function find(name) {
  if (name) {
    return db('pokemon').where('name', name);
  } else {
    return db('pokemon');
  }
}
