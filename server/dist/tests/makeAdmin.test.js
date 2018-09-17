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
const makeAdmin = () => {
  describe('/PUT ADMIN', () => {
    it('It should sign in admin', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'sinmiloluwasunday@yahoo.com', password: 'test'
      }).end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Login successful');
        done();
      });
    });
    it('It should approve a user as admin', done => {
      _chai2.default.request(_index2.default).put('/api/v1/admin/2/approve').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'User role set to admin');
        done();
      });
    });
    it('It should not approve an unexisting user', done => {
      _chai2.default.request(_index2.default).put('/api/v1/admin/2000/approve').end((err, res) => {
        res.should.have.status(404);
        _chai.assert.equal(res.body.message, 'User not found');
        done();
      });
    });
  });
};
exports.default = makeAdmin;