const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test-secret';

// In-memory stand-in for the User model so tests run without MongoDB
const users = [];
jest.mock('../models', () => {
  function User(doc) {
    Object.assign(this, doc, { _id: String(users.length + 1) });
  }
  User.findOne = async ({ email }) => users.find((u) => u.email === email) || null;
  User.prototype.save = async function () {
    users.push(this);
  };
  return { User };
});

const app = require('../server');

const register = (body) => request(app).post('/api/auth/register').send(body);
const login = (body) => request(app).post('/api/auth/login').send(body);
const valid = { firstName: 'Ada', lastName: 'Lovelace', password: 'longenough' };

test('health check', async () => {
  expect((await request(app).get('/api/health')).status).toBe(200);
});

test('register hashes the password, normalizes email and returns a valid token', async () => {
  const res = await register({ ...valid, email: ' Ada@Example.com ' });
  expect(res.status).toBe(201);
  expect(jwt.verify(res.body.token, 'test-secret').userId).toBe('1');
  expect(users[0].email).toBe('ada@example.com');
  expect(users[0].password).not.toBe(valid.password);
});

test('duplicate email in a different case is rejected', async () => {
  expect((await register({ ...valid, email: 'ADA@example.com' })).status).toBe(400);
});

test('login is case-insensitive on email and rejects wrong passwords', async () => {
  expect((await login({ email: 'ADA@example.com', password: 'longenough' })).status).toBe(200);
  expect((await login({ email: 'ada@example.com', password: 'wrongpass1' })).status).toBe(400);
});

test('register and login validate input', async () => {
  expect((await register({ email: 'x@y.com' })).status).toBe(400);
  expect((await register({ ...valid, email: 'not-an-email' })).status).toBe(400);
  expect((await register({ ...valid, email: 'a@b.com', password: 'short' })).status).toBe(400);
  expect((await login({})).status).toBe(400);
});
