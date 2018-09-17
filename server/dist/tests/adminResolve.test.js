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
const adminResolve = () => {
  describe('/PUT ADMIN', () => {
    it('It should resolve request', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/7/resolve').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Request resolved');
        done();
      });
    });
    it('It should not resolve an unexisting request', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/6000/resolve').end((err, res) => {
        res.should.have.status(404);
        _chai.assert.equal(res.body.message, 'Request not found');
        done();
      });
    });
    it('It should not process an invalid request id', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/6uiui/resolve').end((err, res) => {
        res.should.have.status(400);
        _chai.assert.equal(res.body.message, 'Invalid ID');
        done();
      });
    });
  });
};
exports.default = adminResolve;