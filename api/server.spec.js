const request = require('supertest');
const Pokemon = require('../pokemon/pokemon-model.js');
const server = require('./server.js');
const db = require('../data/db-config.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('returns 200 OK', () => {
      // make a GET request to the / endpoint on the server
      return request(server)
        .get('/')
        .then(res => {
          // assert that we get an http status code 200
          expect(res.status).toBe(200);
        });
    });

    it("should return { api: 'up' }", async () => {
      const res = await request(server).get('/');

      expect(res.body.api).toBe('up');
      expect(res.body).toEqual({ api: 'up' });
    });

    it('returns JSON', done => {
      request(server)
        .get('/')
        .then(res => {
          // assert that we get an http status code 200
          expect(res.type).toMatch(/json/i);
          done();
        });
    });

    describe('GET /pokemon', () => {
      it('returns 200 OK', () => {
        return request(server)
          .get('/pokemon')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('should return pokemon', async () => {
        // insert a record
        await Pokemon.insert({
          name: 'Bulbasaur',
          type: 'grass',
          pokedexNumber: 1
        });

        return request(server)
          .get('/pokemon')
          .then(res => {
            // assert that we get an http status code 200
            expect(res.body.length).toBeGreaterThan(0);
          });
      });
    });

    describe('DELETE /pokemon', () => {
      it('returns 200 OK', () => {
        return request(server)
          .delete('/pokemon/1')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('should delete pokemon', async () => {
        await Pokemon.insert({
          name: 'Ivysaur',
          type: 'grass',
          pokedexNumber: 2
        });

        return request(server)
          .delete('/pokemon/2')
          .then(res => {
            expect(Number(res.text)).toBe(1);
          });
      });
    });

    describe('ADD /pokemon', () => {
      it('returns 201 OK', () => {
        return request(server)
          .post('/pokemon')
          .send({ type: 'grass', pokedexNumber: 3, name: 'Venausaur' })
          .then(response => {
            expect(response.status).toBe(201);
          });
      });
    });
  });
});
