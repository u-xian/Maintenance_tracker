'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isStringValidator = require('./isStringValidator');

var _isStringValidator2 = _interopRequireDefault(_isStringValidator);

var _checkName = require('./checkName');

var _checkName2 = _interopRequireDefault(_checkName);

var _queryValidator = require('./queryValidator');

var _queryValidator2 = _interopRequireDefault(_queryValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing the validator for the application.
 */
class userValidator {
  /**
   * This trims request body
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static trimRequestBody(req) {
    Object.keys(req.body).forEach(key => {
      req.body[key] = _validator2.default.trim(req.body[key]);
    });
  }
  /**
   * This validates new account details
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static signUp(req, res, next) {
    let error = false;
    if ((0, _isStringValidator2.default)(req, res)) error = true;else if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      res.status(400).json({ message: 'All fields are required' });
      error = true;
    } else if ((0, _checkName2.default)(req.body.firstName)) {
      res.status(400).json({ message: 'First name can only contain alphabelts and hyphen' });
      error = true;
    } else if ((0, _checkName2.default)(req.body.lastName)) {
      res.status(400).json({ message: 'Last name can only contain alphabelts and hyphen' });
      error = true;
    }
    if (error) return;
    userValidator.trimRequestBody(req);
    req.body.email = req.body.email.toLowerCase();
    req.checkBody('firstName', 'First name cannot be less than 3 or more than 20 characters').isLength({ max: 20, min: 3 });
    req.checkBody('lastName', 'Last name cannot be less than 3 or more than 20 characters').isLength({ max: 20, min: 3 });
    req.checkBody('email', 'Email cannot be more than 30 characters').isLength({ max: 30 });
    req.checkBody('password', 'Password cannot be less than 3 or more than 20 characters').isLength({ max: 20, min: 3 });
    req.check('email').isEmail().withMessage('Invalid email address');
    const errors = req.validationErrors();
    if (errors) {
      if (errors[0].msg === 'Invalid email address') {
        res.status(422).json({ message: errors[0].msg });
      } else res.status(400).json({ message: errors[0].msg });
      return;
    }
    next();
  }
  /**
   * This validates login details
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static login(req, res, next) {
    if ((0, _isStringValidator2.default)(req, res)) return;
    if (!req.body.email) return res.status(400).json({ message: 'Email is required' });
    if (!req.body.password) return res.status(400).json({ message: 'Password is required' });
    req.body.email = (0, _queryValidator2.default)(req.body.email);
    next();
  }
  /**
   * Validates and sanitizes user email input.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Function} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static sendEmail(req, res, next) {
    if ((0, _isStringValidator2.default)(req, res)) return;
    if (req.body.email) {
      req.body.email = (0, _queryValidator2.default)(req.body.email);
    }
    next();
  }
  /**
   * Validates user's new password.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Function} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static resetPassword(req, res, next) {
    if ((0, _isStringValidator2.default)(req, res)) return;
    if (!req.body.password) return res.status(400).json({ message: 'Password is required' });
    if (req.body.password < 3 || req.body.password > 20) {
      return res.status(400).json({ message: 'Password cannot be less than 3 or more than 20 characters' });
    }
    next();
  }
}
exports.default = userValidator;