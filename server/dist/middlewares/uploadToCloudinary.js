'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadToCloudinary = (req, res, next) => {
  if (!req.body.image) return next();
  return _cloudinary2.default.uploader.upload(req.body.image, (result, error) => {
    if (result.error) return res.status(400).json({ message: 'Image failed to upload' });
    req.body.image = result.url;
    return next();
  }, { folder: 'm-tracker', transformation: { width: 256, height: 256, crop: 'limit' } });
};
exports.default = uploadToCloudinary;