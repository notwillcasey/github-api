const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe ('initialization of testing suite', () => {

  it('should add 2 and 2', () => {
    expect(2 + 2).toBe(4);
  })
})