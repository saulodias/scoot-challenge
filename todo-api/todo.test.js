const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('./server');
const db = require('./db');

// Define the test
describe('POST /todos', () => {
  beforeAll((done) => {
    // Create the test database tables before running the tests
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, priority INTEGER, dueDate INTEGER)', done);
  });

  afterAll((done) => {
    // Close the test database connection after running the tests
    db.close(done);
  });

  test('adds a lot of new todos', async () => {
    const numTodos = 500;
    const todos = [];

    // Generate random todos
    for (let i = 0; i < numTodos; i++) {
      const newTodo = {
        dueDate: new Date(faker.date.future()).getTime(),
        description: faker.lorem.sentence(5),
        priority: faker.datatype.number({ min: 0, max: 2 }),
      };
      todos.push(newTodo);
    }

    // Insert todos into the database
    for (let i = 0; i < numTodos; i++) {
      await request(app)
        .post('/todos')
        .send(todos[i])
        .expect(201);
    }

    // Check that todos were inserted
    const response = await request(app)
      .get('/todos')
      .expect(200);

    expect(response.body.length).toBe(10);
  });
});