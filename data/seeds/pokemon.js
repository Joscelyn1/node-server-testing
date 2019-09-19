exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon') // <<<<<<<<<<<<<<<<<<<<<<change this
    .truncate() // resets the id primary key
    .then(function() {
      // Inserts seed entries
      return knex('pokemon').insert([
        // <<<<<< change table name here
        {
          name: 'Umbreon',
          type: 'dark',
          pokedexNumber: 197
        },
        {
          name: 'Charmander',
          type: 'fire',
          pokedexNumber: 4
        },
        {
          name: 'Squirtle',
          type: 'water',
          pokedexNumber: 7
        },
        {
          name: 'Eevee',
          type: 'normal',
          pokedexNumber: 133
        },
        {
          name: 'Pikachu',
          type: 'electric',
          pokedexNumber: 25
        }
      ]);
    });
};
