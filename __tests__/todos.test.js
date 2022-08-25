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
  firstName: 'Baba',
  lastName: 'Yaga',
  email: 'russian@witch.com',
  password: 'fakePasswordHash',
};

describe('todo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /todos show authenticated users todo list', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(testUser);

    const res = await agent.get('/api/v1/todos');

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(0);
  });
  it('#POST /todos adds new todo', async () => {
    const testTodo = {
      user_id: '1',
      item: 'fetch new bundle of sticks',
      bought: false,
    };

    const agent = request.agent(app);
    await agent.post('/api/v1/users/sessions').send(existingUser);

    const res = await agent.post('/api/v1/todos').send(testTodo);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...testTodo,
      created_at: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
