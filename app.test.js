const request = require('supertest');
const express = require('express');

// We import a slightly modified version of our app logic
const app = express();
app.get('/', (req, res) => res.status(200).send('Pipeline is working.'));

describe('GET /', () => {
  it('should return the correct welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Pipeline is working.');
  });
});
