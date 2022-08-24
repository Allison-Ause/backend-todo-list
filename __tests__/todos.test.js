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

// const testTodo = {
//   user_id: 1,
//   item: 'Take a nap.',
//   bought: false,
// };

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

  afterAll(() => {
    pool.end();
  });
});
