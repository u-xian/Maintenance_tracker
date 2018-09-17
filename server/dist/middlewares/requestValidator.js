'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _pg = require('pg');

var _isStringValidator = require('./isStringValidator');

var _isStringValidator2 = _interopRequireDefault(_isStringValidator);

var _queryValidator = require('./queryValidator');

var _queryValidator2 = _interopRequireDefault(_queryValidator);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientPool = new _pg.Pool(_config.connectionString);

/**
 * Class representing the validator for the application.
 */
class requestValidator {
  /**
   * This validates a get request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static getAll(req, res, next) {
    if (req.query.category) {
      req.query.category = (0, _queryValidator2.default)(req.query.category);
    }
    if (req.query.status) {
      req.query.status = (0, _queryValidator2.default)(req.query.status);
    }
    if (req.query.page) {
      const page = parseInt(req.query.page, 10);
      req.query.page = page;
      if (page < 1 || Number(page) !== page) req.query.page = 1;
      const limit = parseInt(req.query.limit, 10);
      req.query.limit = limit;
      if (!req.query.limit || limit < 1 || Number(limit) !== limit) req.query.limit = 30;
      if (limit > 50) req.query.limit = 50;
    }
    next();
  }
  /**
   * This validates the length of request input fields.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} suceess or failure
   */
  static validateLength(req, res) {
    let error = false;
    if (req.body.title && req.body.title.length > 20) {
      res.status(400).json({ message: 'Title cannot be more than 20 characters' });
      error = true;
    }
    if (req.body.title && req.body.title.length < 5) {
      res.status(400).json({ message: 'Title cannot be less than 5 characters' });
      error = true;
    }
    if (req.body.description && req.body.description.length > 250) {
      res.status(400).json({ message: 'Description length cannot be more than 250 characters' });
      error = true;
    }
    if (req.body.description && req.body.description.length < 20) {
      res.status(400).json({ message: 'Description length cannot be less than 20 characters' });
      error = true;
    }
    if (req.body.category && req.body.category.length > 20) {
      res.status(400).json({ message: 'Category length cannot be more than 20 characters' });
      error = true;
    }
    if (req.body.image && req.body.image.length > 200) {
      res.status(400).json({ message: 'Image length cannot be more than 200 characters' });
      error = true;
    }
    if (error) return true;
  }
  /**
   * This validates a new request if it is in the right format.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static addRequest(req, res, next) {
    let error = false;
    if (!req.body.title) {
      res.status(400).json({ message: 'Request title required' });
      error = true;
    }
    if (!req.body.description) {
      res.status(400).json({ message: 'Request description required' });
      error = true;
    }
    if (requestValidator.validateLength(req, res)) error = true;
    if ((0, _isStringValidator2.default)(req, res)) error = true;

    if (req.body.title.indexOf(' ') !== -1 || req.body.title.indexOf('-') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
        test = test.replace('-', '');
      }
      if (!_validator2.default.isAlphanumeric(test)) {
        res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
        error = true;
      }
    } else if (!_validator2.default.isAlphanumeric(req.body.title)) {
      res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      error = true;
    }
    if (error) return;
    next();
  }
  /**
   * This validates update inputs
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   *  @param {Object} next - call next route handler
   * @returns {Object} success or fail
   */
  static async modifyRequest(req, res, next) {
    let error = false;
    if (requestValidator.validateLength(req, res)) error = true;
    if ((0, _isStringValidator2.default)(req, res)) error = true;
    if (req.body.title && req.body.title.indexOf(' ') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
      }
      if (!_validator2.default.isAlphanumeric(test)) {
        res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
        error = true;
      }
    } else if (req.body.title && !_validator2.default.isAlphanumeric(req.body.title)) {
      res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      error = true;
    }
    if (error) return;
    const response = await requestValidator.checkIfApproved(req, res);
    if (response.message) return res.status(response.status).json({ message: response.message });
    req.body.selectedRequest = response;
    next();
  }
  /**
   * This checks if request has been approved already
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} response message
   */
  static checkIfApproved(req, res) {
    return clientPool.connect().then(client => {
      return client.query({ text: 'SELECT * FROM Requests WHERE Id=$1', values: [parseInt(req.params.requestId, 10)] }).then(requests => {
        if (!requests.rows[0]) return { message: 'Request not found', status: 404 };
        client.release();
        const [selectedRequest] = requests.rows;
        if (selectedRequest.status === 'approved') return { message: 'Request is already approved', status: 403 };
        if (req.decoded.id !== selectedRequest.userid) return { message: 'You are not the author of this request', status: 403 };
        return selectedRequest;
      }).catch(error => {
        client.release();
        res.status(500).json(error.stack);
      });
    });
  }
}
exports.default = requestValidator;