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
  it('#POST /users signs up a new user if none exists', async () => {
    const res = request(app).post('/api/v1/users').send(testUser);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...testUser,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
