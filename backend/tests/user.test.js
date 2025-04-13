const request = require('supertest');
const app = require('../server');
const { User } = require('../models/user');

describe('User Management API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} }); // Clear users table
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toBe('testuser');
      expect(res.body.email).toBe('test@example.com');
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const res = await request(app).get('/api/users');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const res = await request(app).get(`/api/users/${user.id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(user.id);
      expect(res.body.username).toBe('testuser');
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/999');
      
      expect(res.statusCode).toBe(404);
    });
  });
}); 