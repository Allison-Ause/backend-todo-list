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

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('#POST /users signs up & in a new user if none exists', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(
      'Successfully logged in with new account!'
    );
  });
  it('#POST /users signs in user if exists', async () => {
    const existingUser = {
      firstName: 'Allison',
      lastName: 'Ause',
      email: 'allison@works.com',
      password: 'fakePasswordHash',
    };
    const agent = request.agent(app);
    const signIn = await agent.post('/api/v1/users').send(existingUser);
    console.log('SignedIN', signIn);
    const res = await agent.post('/api/v1/users/sessions').send(existingUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Welcome to the Rodeo! You are all signed in.'
    );
  });
  afterAll(() => {
    pool.end();
  });
});
