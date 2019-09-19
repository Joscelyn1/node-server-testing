const Pokemon = require('./pokemon-model.js');

const db = require('../data/db-config.js');

describe('pokemon model', () => {
  beforeEach(async () => {
    await db('pokemon').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('insert()', () => {
    it('should insert pokemon into the db', async () => {
      // insert a record
      await Pokemon.insert({
        name: 'Raichu',
        type: 'electric',
        pokedexNumber: 26
      });

      let pokemon = await db('pokemon');

      // assert the record was inserted
      expect(pokemon).toHaveLength(1);
    });

    // it('should insert hobbits into the db', async () => {
    //   // insert a record
    //   const [id] = await Hobbits.insert({ name: 'Gaffer' });

    //   let hobbit = await db('hobbits')
    //     .where({ id })
    //     .first();

    //   // assert the record was inserted
    //   expect(hobbit.name).toBe('Gaffer');
    // });
  });
});
