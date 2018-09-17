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
const deleteRequest = () => {
  describe('/DELETE Request', () => {
    it('It should delete a Request', done => {
      _chai2.default.request(_index2.default).delete('/api/v1/users/requests/7').end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eql('Request successfully deleted');
        done();
      });
    });
    it('It should NOT process an invalid Request ID', done => {
      _chai2.default.request(_index2.default).delete('/api/v1/users/requests/tuuy').end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Invalid ID');
        done();
      });
    });
    it('It should NOT process a non-existing Request ID', done => {
      _chai2.default.request(_index2.default).delete('/api/v1/users/requests/9000000').end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.be.eql('Request does not exist');
        done();
      });
    });
  });
};
exports.default = deleteRequest;