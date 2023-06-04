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

module.exports = ((err, req, res, next) => {
  err.statusCode ??= 500;
  err.status ??= 'Error';
  let error = { ...err };
  if (err.name === 'CastError') {
    error = handleCastErrorDB(err);
  }
  if (err.code === 11000) {
    error = handleDuplicateDB(err);
  }
  if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(err);
  }
  if (error.isOperational) {
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