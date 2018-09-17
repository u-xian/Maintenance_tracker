'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _adminController = require('../controllers/adminController');

var _adminController2 = _interopRequireDefault(_adminController);

var _requestValidator = require('../middlewares/requestValidator');

var _requestValidator2 = _interopRequireDefault(_requestValidator);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _idValidator = require('../middlewares/idValidator');

var _idValidator2 = _interopRequireDefault(_idValidator);

var _isAdminValidator = require('../middlewares/isAdminValidator');

var _approveRequestValidator = require('../middlewares/approveRequestValidator');

var _approveRequestValidator2 = _interopRequireDefault(_approveRequestValidator);

var _modifyStatus = require('../middlewares/modifyStatus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const adminRoute = (0, _express2.default)();
adminRoute.route('/requests').get(_auth2.default, _isAdminValidator.isAdminValidator, _requestValidator2.default.getAll, _adminController2.default.getAll);
adminRoute.route('/requests/:requestId/approve').put(_idValidator2.default, _auth2.default, _isAdminValidator.isAdminValidator, _approveRequestValidator2.default, _modifyStatus.approveStatus, _adminController2.default.modifyStatus);
adminRoute.route('/requests/:requestId/disapprove').put(_idValidator2.default, _auth2.default, _isAdminValidator.isAdminValidator, _modifyStatus.disapproveStatus, _adminController2.default.modifyStatus);
adminRoute.route('/requests/:requestId/resolve').put(_idValidator2.default, _auth2.default, _isAdminValidator.isAdminValidator, _modifyStatus.resolveStatus, _adminController2.default.modifyStatus);
adminRoute.route('/admin/:userId/approve').put(_idValidator2.default, _auth2.default, _isAdminValidator.isSuperAdminValidator, _adminController2.default.makeAdmin);

exports.default = adminRoute;