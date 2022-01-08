const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);


describe('/pr/commits endpoint integration tests', () => {
  it('should return array of objects for provided user and repo', async () => {
    let response = await request.get('/pr/commits?url=https://github.com/notwillcasey/notwillcasey');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return array of objects for provided user and repo', async () => {
    let response = await request.get('/pr/commits?url=https://github.com/colinhacks/zod');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return correct error messaging for non-existent user and repo combinations', async () => {
    let response = await request.get('/pr/commits?url=https://github.com/notwillcasey/zod');

    expect(response.status).toBe(404);
    expect(response.text).toBe('error finding user and repo combination - check that the repo exists for the entered user');
  });

  it('should return correct error messaging for malformed query parameters', async () => {
    let response = await request.get('/pr/commits?url=https://github.com/');

    expect(response.status).toBe(400);
    expect(response.text).toBe('malformed query parameters - verify input URL is in expected format');
  });

  it('should return correct error messaging for missing query parameters', async () => {
    let response = await request.get('/pr/commits');

    expect(response.status).toBe(400);
    expect(response.text).toBe('malformed query parameters - verify input URL is in expected format');
  });

})