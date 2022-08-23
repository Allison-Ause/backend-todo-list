const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  firstName: 'Kylo',
  lastName: 'Ren',
  email: 'darkside@redemption.com',
  password: 'iloverey',
};

const existingUser = {
  firstName: 'Allison',
  lastName: 'Ause',
  email: 'allison@works.com',
  password: 'fakePasswordHash',
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#POST /users signs up & in a new user if none exists', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(
      'Successfully logged in with new account!'
    );
  });
  it('#POST /users signs in user if exists', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(existingUser);

    const res = await agent.post('/api/v1/users/sessions').send(existingUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Welcome to the Rodeo! You are all signed in.'
    );
  });
  it('#GET /me returns user info if logged in', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(existingUser);

    const res = await agent.get('/api/v1/users/me');
    console.log('res.body from /me', res.body);
    expect(res.status).toBe(200);
    expect(res.body.email).toEqual('allison@works.com');
  });
  it('#GET /me returns 401 if not logged in', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });

  afterAll(() => {
    pool.end();
  });
});
