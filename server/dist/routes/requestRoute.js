'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _requestController = require('../controllers/requestController');

var _requestController2 = _interopRequireDefault(_requestController);

var _requestValidator = require('../middlewares/requestValidator');

var _requestValidator2 = _interopRequireDefault(_requestValidator);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _idValidator = require('../middlewares/idValidator');

var _idValidator2 = _interopRequireDefault(_idValidator);

var _uploadToCloudinary = require('../middlewares/uploadToCloudinary');

var _uploadToCloudinary2 = _interopRequireDefault(_uploadToCloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestRoute = (0, _express2.default)();
requestRoute.use((0, _expressFileupload2.default)());
requestRoute.route('/users/requests').get(_auth2.default, _requestValidator2.default.getAll, _requestController2.default.getAll).post(_requestValidator2.default.addRequest, _auth2.default, _uploadToCloudinary2.default, _requestController2.default.addRequest);
requestRoute.route('/users/requests/:requestId').get(_auth2.default, _idValidator2.default, _requestController2.default.getARequest).put(_auth2.default, _idValidator2.default, _requestValidator2.default.modifyRequest, _uploadToCloudinary2.default, _requestController2.default.modifyRequest).delete(_auth2.default, _idValidator2.default, _requestController2.default.deleteRequest);
requestRoute.route('/upload').post(_auth2.default, _requestController2.default.uploadToLocal);
exports.default = requestRoute;