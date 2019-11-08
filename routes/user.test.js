/* eslint-disable no-undef */
const request = require('supertest');
const nanoid = require('nanoid');
// const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
// const Redis = require('redis').createClient(REDIS_URL);
// const server = require('../index');
const BASE_URL = 'http://localhost:3002';

const shutdown = async () => {
  await new Promise(resolve => {
    Redis.end(() => {
      resolve();
    });
  });
  await new Promise(resolve => setImmediate(resolve));
}

describe('User function API testing', () => {
  // afterEach(async () => {
  //   // await server.close();
  //   shutdown();
  // });

  describe('POST /signin', () => {
    it('should return token and json char', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: 'example10',
          email: 'example10@example.com',
          password: '12345678',
          confirmPassword: '12345678'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(201);
      expect(res.headers['x-access-token']).not.toBeUndefined();
      expect(res.body.message).toEqual('Create Success');
      done();
    });
    it('should return token and json char', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/signin')
        .send({ email: 'example10@example.com', password: '12345678' })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(200);
      expect(res.headers['x-access-token']).not.toBeUndefined();
      expect(res.body.message).toEqual('Login success');
      done();
    });
    it('should return error msg with wrong mail input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/signin')
        .send({ email: 'example18@example.com', password: '12345678' })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Invalid password or email');
      done();
    });
    it('should return error msg with wrong passowrd input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/signin')
        .send({ email: 'example8@example.com', password: '1:3928:32:8' })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(400);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Invalid password or email');
      done();
    });
  });

  describe('POST /register', () => {
    it('should return token and json char', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: `${nanoid(5)}`,
          email: `${nanoid(5)}@example.com`,
          password: '12345678',
          confirmPassword: '12345678'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(201);
      expect(res.headers['x-access-token']).not.toBeUndefined();
      expect(res.body.message).toEqual('Create Success');
      done();
    });
    it('should return error msg with non input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({})
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Please complete all the form');
      done();
    });
    it('should return error msg with wrong passowrd input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: `${nanoid(5)}`,
          email: `${nanoid(5)}@example.com`,
          password: '12',
          confirmPassword: '12'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Password too short');
      done();
    });
    it('should return error msg with wrong passowrd input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: `${nanoid(5)}`,
          email: `${nanoid(5)}@example.com`,
          password: '1231212342134241221424242',
          confirmPassword: '1231212342134241221424242'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Password too long');
      done();
    });
    it('should return error msg with wrong passowrd input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: `${nanoid(5)}`,
          email: `${nanoid(5)}@example.com`,
          password: '123456789',
          confirmPassword: '12345678'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Make sure submit correct password');
      done();
    });
    it('should return error msg with wrong passowrd input', async done => {
      const res = await request(BASE_URL)
        .post('/api/v1/users/register')
        .send({
          name: `${nanoid(5)}`,
          email: `example8@example.com`,
          password: '12345678',
          confirmPassword: '12345678'
        })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(404);
      expect(res.headers['x-access-token']).toBeUndefined();
      expect(res.body.message).toEqual('Email already in use');
      done();
    });
  });

  describe('GET /logout', () => {
    it('should return err msg without token which cannot pass jwt', async done => {
      const res = await request(BASE_URL)
        .get('/api/v1/users/logout')
        .set('Accept', 'application/json');
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('You must sign in first');
      done();
    });
  });
});
