const request = require('supertest');
const app = require('./server');
const db = require('./db');
describe('POST /todos', () => {
  beforeAll((done) => {
    // Create the test database tables before running the tests
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, priority INTEGER, dueDate INTEGER)', done);
  });

  afterAll((done) => {
    // Close the test database connection after running the tests
    db.close(done);
  });

  test('adds new todos', async () => {
    const newTodos = [
      {
        dueDate: new Date().getTime(),
        description: 'Write a test',
        priority: 0,
      },
      {
        dueDate: new Date().getTime(),
        description: 'Write more tests',
        priority: 1,
      },
      {
        dueDate: new Date().getTime(),
        description: 'Fix bugs',
        priority: 2,
      },
    ];

    const responses = await Promise.all(newTodos.map(async (newTodo) => {
      const response = await request(app)
        .post('/todos')
        .send(newTodo)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.description).toBe(newTodo.description);
      expect(response.body.priority).toBe(newTodo.priority);

      return response;
    }));

    // Check that all todos were added successfully
    expect(responses.length).toBe(newTodos.length);
  });
});