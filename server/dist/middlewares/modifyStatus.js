'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const approveStatus = (req, res, next) => {
  req.body.status = 'approved';
  next();
};
const disapproveStatus = (req, res, next) => {
  req.body.status = 'disapproved';
  next();
};
const resolveStatus = (req, res, next) => {
  req.body.status = 'resolved';
  next();
};
exports.approveStatus = approveStatus;
exports.disapproveStatus = disapproveStatus;
exports.resolveStatus = resolveStatus;