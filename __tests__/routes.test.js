'use strict';

const server = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server.app); //server is an obbject with propert app and start

describe('Testing server routes', () => {
  it('Should respond properly on request to /categories', (done) => {
    mockRequest.get('/categories')
    .then(results => {
      console.log(results.body);
      expect(results.status).toBe(200);
      expect(results.body.count).toBe(0); 
      done();
    }).catch(console.error);
  });

  it('Should respond properly on post to /categories', (done) => {
    mockRequest.post('/categories')
    .send({ name: 'post1', content: 'my first post' })
    .then(results => {
      console.log('here');
      expect(results.status).toBe(200);
      expect(results.body.name).toBe('post1');
      done();
    }).catch(console.error);
  });
});
