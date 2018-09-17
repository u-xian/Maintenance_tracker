'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _getRequest = require('./getRequest.test');

var _getRequest2 = _interopRequireDefault(_getRequest);

var _postRequest = require('./postRequest.test');

var _postRequest2 = _interopRequireDefault(_postRequest);

var _updateRequest = require('./updateRequest.test');

var _updateRequest2 = _interopRequireDefault(_updateRequest);

var _createUser = require('./createUser.test');

var _createUser2 = _interopRequireDefault(_createUser);

var _loginUser = require('./loginUser.test');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _adminGetAll = require('./adminGetAll.test');

var _adminGetAll2 = _interopRequireDefault(_adminGetAll);

var _adminApprove = require('./adminApprove.test');

var _adminApprove2 = _interopRequireDefault(_adminApprove);

var _adminDisapprove = require('./adminDisapprove.test');

var _adminDisapprove2 = _interopRequireDefault(_adminDisapprove);

var _adminResolve = require('./adminResolve.test');

var _adminResolve2 = _interopRequireDefault(_adminResolve);

var _makeAdmin = require('./makeAdmin.test');

var _makeAdmin2 = _interopRequireDefault(_makeAdmin);

var _deleteRequest = require('./deleteRequest.test');

var _deleteRequest2 = _interopRequireDefault(_deleteRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);
describe('Test for Request API endpoints', () => {
  (0, _loginUser2.default)();
  (0, _getRequest2.default)();
  (0, _postRequest2.default)();
  (0, _updateRequest2.default)();
  (0, _adminApprove2.default)();
  (0, _adminDisapprove2.default)();
  (0, _adminResolve2.default)();
  (0, _deleteRequest2.default)();
  (0, _createUser2.default)();
  (0, _makeAdmin2.default)();
  (0, _adminGetAll2.default)();
});