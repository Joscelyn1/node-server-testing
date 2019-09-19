const request = require('supertest');

const server = require('./server.js');

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
  });
});
