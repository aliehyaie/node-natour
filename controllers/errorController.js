const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please login again!', 401);

handleJWTExpiredError = () => new AppError('Your token has expired! please login again',401);

module.exports = ((err, req, res, next) => {
  err.statusCode ??= 500;
  err.status ??= 'Error';
  let error = Object.assign(err, {});
  if (err.name === 'CastError') {
    error = handleCastErrorDB(error);
  }
  if (err.code === 11000) {
    error = handleDuplicateDB(error);
  }
  if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }
  if (err.name === 'JSONWEBTOKENError') {
    console.log('MEOW');
    error = handleJWTError();
  }
  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }
  if (error.isOperational) {
    console.log(error.message, 'MESSAGEEGEE');
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  } else {
    res.status(500).json({
      status: 'status',
      message: 'Something went wrong'
    });
  }
});