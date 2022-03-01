// Imports
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../server');

// Set Up
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

// Sanity Check
it('sanity check', () => {
  expect(true).not.toBe(false)
});

// Tests
describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  test('Register', async () => {
    let user = await request(server)
      .post('/api/users/register')
      .send({ username: 'foo', password: '1234' });
    expect(user.body).toHaveProperty('username', 'foo');
  });

  test('Login', async () => {
    let user = await request(server)
      .post('/api/users/register')
      .send({ username: 'foo', password: '1234' });
    let welcome = await request(server)
      .post('/api/users/login')
      .send({ username: 'foo', password: '1234' });
    expect(welcome.body).toHaveProperty('message', 'Dinner time!');
  });
  
  test('Login - Wrong Password', async () => {
    // Create User
    await request(server)
      .post('/api/users/register')
      .send({ username: 'foo', password: '1234' });
    // Login
    let welcome = await request(server)
      .post('/api/users/login')
      .send({ username: 'foo', password: '12345' });
    expect(welcome.body).toHaveProperty('message', 'Are you sure you are related?');
  });

  test('Add Recipe', async () => {
    // Create User
    await request(server)
      .post('/api/users/register')
      .send({ username: 'foo', password: '1234' });
    // Login
    let user = await request(server)
      .post('/api/users/login')
      .send({ username: 'foo', password: '1234' });
    // Create Recipe
    let recipe = await request(server)
      .post('/api/recipes/')
      .send({ recipe_title: 'Banana Bread', recipe_source: 'Grandma', cat_id: 1 })
      .set('Authorization', `${user.body.token}`);
    expect(recipe.body.recipe_title).toBe('Banana Bread');
  });
  
  test('Get Recipes', async () => {
    // Create User
    await request(server)
      .post('/api/users/register')
      .send({ username: 'foo', password: '1234' });
    // Login
    let user = await request(server)
      .post('/api/users/login')
      .send({ username: 'foo', password: '1234' });
    // Fetch Recipes
      let recipes = await request(server)
      .get('/api/recipes')
      .set('Authorization', `${user.body.token}`);
    expect(recipes.body).toHaveLength(3);
  });

});