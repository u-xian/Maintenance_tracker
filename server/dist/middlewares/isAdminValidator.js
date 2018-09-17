'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const isAdminValidator = exports.isAdminValidator = (req, res, next) => {
  if (req.decoded.role !== 'admin') return res.status(403).json({ message: 'You are not an admin' });
  next();
};
const isSuperAdminValidator = exports.isSuperAdminValidator = (req, res, next) => {
  if (req.decoded.id !== 1) return res.status(403).json({ message: 'You are not super admin' });
  next();
};