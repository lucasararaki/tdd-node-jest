const request = require('supertest');
const app = require('../../src/app');

const truncate = require('../utils/truncate');
const factory = require('../factories');

// Describe - Categoria ou grupo de testes
describe('Authentication', () => {
  // executa antes de cada teste
  beforeEach(async () => {
    await truncate();
  });

  // It - testa a funcionalidade
  it('should authenticate with valid credentials', async () => {

    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
  });

  it('should NOT authenticate with invalid credentials', async () => {

    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'qwer1234'
      });

    expect(response.status).toBe(401);
  });

  it('should return JWT token when authenticated', async () => {

    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private route when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  })

  it('should NOT be able to access private routes whitout JWT token', async () => {
    const response = await request(app)
      .get('/dashboard');

    expect(response.status).toBe(401);
  })

  it('should NOT be able to access private routes whith invalid JWT token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 141241231251231212312123124');

    expect(response.status).toBe(401);
  })
});