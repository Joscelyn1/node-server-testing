exports.up = function(knex) {
  // create a table called pokemon
  return knex.schema.createTable('pokemon', tbl => {
    tbl.increments();

    tbl
      .string('name', 17)
      .notNullable()
      .unique();

    tbl.string('type').notNullable();

    tbl
      .integer('pokedexNumber')
      .notNullable()
      .unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pokemon');
};
