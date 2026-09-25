const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test-secret';

// In-memory stand-ins for the models so tests run without MongoDB
const users = [];
const businesses = [];
jest.mock('../models', () => {
  function User(doc) {
    Object.assign(this, doc, { _id: String(users.length + 1) });
  }
  User.findOne = async ({ email }) => users.find((u) => u.email === email) || null;
  User.findById = async (id) => users.find((u) => u._id === id) || null;
  User.exists = async ({ _id }) => users.some((u) => u._id === _id);
  User.updateOne = async ({ _id }, update) => Object.assign(users.find((u) => u._id === _id), update);
  User.prototype.save = async function () {
    users.push(this);
  };

  const Business = {
    findOne: async ({ owner }) => businesses.find((b) => b.owner === owner) || null,
    findOneAndUpdate: async ({ owner }, update) => {
      let business = businesses.find((b) => b.owner === owner);
      if (!business) {
        business = { _id: `b${businesses.length + 1}`, owner };
        businesses.push(business);
      }
      return Object.assign(business, update);
    },
  };

  return { User, Business };
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
  expect(res.body.user).toEqual({
    id: '1',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    businessType: null,
  });
});

test('sessions last 7 days', async () => {
  const { token } = (await login({ email: 'ada@example.com', password: 'longenough' })).body;
  const { iat, exp } = jwt.verify(token, 'test-secret');
  expect(exp - iat).toBe(7 * 24 * 60 * 60);
});

test('duplicate email in a different case is rejected', async () => {
  expect((await register({ ...valid, email: 'ADA@example.com' })).status).toBe(400);
});

test('login is case-insensitive on email and rejects wrong passwords', async () => {
  const res = await login({ email: 'ADA@example.com', password: 'longenough' });
  expect(res.status).toBe(200);
  expect(res.body.user).not.toHaveProperty('password');
  expect((await login({ email: 'ada@example.com', password: 'wrongpass1' })).status).toBe(400);
});

test('register and login validate input', async () => {
  expect((await register({ email: 'x@y.com' })).status).toBe(400);
  expect((await register({ ...valid, email: 'not-an-email' })).status).toBe(400);
  expect((await register({ ...valid, email: 'a@b.com', password: 'short' })).status).toBe(400);
  expect((await login({})).status).toBe(400);
});

test('GET /api/auth returns the signed-in user', async () => {
  const { token } = (await login({ email: 'ada@example.com', password: 'longenough' })).body;
  const res = await request(app).get('/api/auth').set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    id: '1',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    businessType: null,
  });
});

describe('PUT /api/business/me', () => {
  const setType = (token, type) =>
    request(app).put('/api/business/me').set('Authorization', `Bearer ${token}`).send({ type });
  const tokenFor = async () => (await login({ email: 'ada@example.com', password: 'longenough' })).body.token;

  test('requires sign in', async () => {
    expect((await request(app).put('/api/business/me').send({ type: 'food' })).status).toBe(401);
  });

  test('rejects unknown types', async () => {
    const res = await setType(await tokenFor(), 'spaceships');
    expect(res.status).toBe(400);
    expect(businesses).toHaveLength(0);
  });

  test('creates the business once, then updates it; sign in and session restore return the type', async () => {
    const token = await tokenFor();
    expect((await setType(token, 'food')).body).toEqual({ businessType: 'food' });
    expect((await setType(token, 'pets')).body).toEqual({ businessType: 'pets' });
    expect(businesses).toHaveLength(1);
    expect(users[0].business).toBe(businesses[0]._id);

    const signIn = await login({ email: 'ada@example.com', password: 'longenough' });
    expect(signIn.body.user.businessType).toBe('pets');
    const restored = await request(app).get('/api/auth').set('Authorization', `Bearer ${token}`);
    expect(restored.body.businessType).toBe('pets');
  });

  test('a token for a deleted user is rejected', async () => {
    const orphan = jwt.sign({ userId: '999' }, 'test-secret');
    expect((await setType(orphan, 'food')).status).toBe(401);
  });
});

test('GET /api/auth rejects missing, invalid and orphaned tokens', async () => {
  expect((await request(app).get('/api/auth')).status).toBe(401);
  expect((await request(app).get('/api/auth').set('Authorization', 'Bearer nope')).status).toBe(401);
  const orphan = jwt.sign({ userId: '999' }, 'test-secret');
  expect((await request(app).get('/api/auth').set('Authorization', `Bearer ${orphan}`)).status).toBe(401);
});

test('malformed JSON gets a JSON 400', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send('{"email":');
  expect(res.status).toBe(400);
  expect(res.body).toEqual({ message: 'Bad request' });
});

test('unknown API paths get a JSON 404', async () => {
  const res = await request(app).get('/api/nope');
  expect(res.status).toBe(404);
  expect(res.body).toEqual({ message: 'Not found' });
});

test('the rest of the business API is a signed-in placeholder', async () => {
  const { token } = (await login({ email: 'ada@example.com', password: 'longenough' })).body;
  expect((await request(app).get('/api/business/other')).status).toBe(401);
  expect((await request(app).get('/api/business/other').set('Authorization', `Bearer ${token}`)).status).toBe(501);
});

test.each(['/api/campaigns', '/api/customers', '/api/analytics'])(
  'placeholder %s returns 501',
  async (path) => {
    expect((await request(app).get(path)).status).toBe(501);
  }
);
