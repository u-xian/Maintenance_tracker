'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _userValidator = require('../middlewares/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _checkMail = require('../middlewares/checkMail');

var _checkMail2 = _interopRequireDefault(_checkMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoute = (0, _express2.default)();
userRoute.use((0, _expressValidator2.default)());
userRoute.route('/auth/signup').post(_userValidator2.default.signUp, _userController2.default.signUp);
userRoute.route('/auth/login').post(_userValidator2.default.login, _userController2.default.login);
userRoute.route('/users/password/reset').post(_userValidator2.default.sendEmail, _checkMail2.default, _userController2.default.sendEmail).put(_auth2.default, _userValidator2.default.resetPassword, _userController2.default.resetPassword);
exports.default = userRoute;