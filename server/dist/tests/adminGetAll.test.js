'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);
const adminGetAll = () => {
  describe('/GET Request', () => {
    it('It should sign in admin', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'sinmiloluwasunday@yahoo.com', password: 'test'
      }).end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Login successful');
        done();
      });
    });
    it('It should get all requests if admin', done => {
      _chai2.default.request(_index2.default).get('/api/v1/requests').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        done();
      });
    });
    it('It should sign in another user', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'regular3@yahoo.com', password: 'test'
      }).end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Login successful');
        done();
      });
    });
    it('It should not return all requests if not admin', done => {
      _chai2.default.request(_index2.default).get('/api/v1/requests').end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('You are not an admin');
        done();
      });
    });
  });
};
exports.default = adminGetAll;