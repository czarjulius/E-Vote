import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../server';

const api = supertest(server);

describe('tests for user controller', () => {
  describe('/POST create user', () => {
    it('should create a new user', (done) => {
      const user = {
        firstName: 'ekanem',
        lastName: 'tobi',
        otherName: 'tobilish',
        email: 'tobi@gmail.com',
        password: '12345',
        phoneNumber: '09088776654',
        passportUrl: 'http://res.cloudinary.com/dghlhphlh/image/upload/v1549405597/fxbi2njrucdsxielitcu.jpg',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('user');
          expect(res.header).to.have.property('x-auth-token');
          done();
        });
    });
  });
});
