const AppError = require('../utils/appError');
const mongoose = require('mongoose');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value // ${value} // Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  let error = { ...err };

  const newError = error.errors;
  let error3 = [];
  Object.keys(newError).forEach((key) => {
    newError[key].name = 'ValidatorError';
    error3.push(newError[key].message);
  });
  const message = `Invalid input data. ${error3.join('\n')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token. Please log in again', 401);

const handleJWTExpierdError = () =>
  new AppError('Yor token has expierd. Please log in again', 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  console.error('ERROR:', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProduction = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error('ERROR:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Some Thing Went Very Wrong',
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  console.error('ERROR:', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err instanceof mongoose.Error.CastError) {
      error = handleCastErrorDB(error);
      sendErrorProduction(error, req, res);
    } else if (err instanceof mongoose.Error.ValidationError) {
      error = handleValidationErrorDB(error);
      sendErrorProduction(error, req, res);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
      sendErrorProduction(error, req, res);
    } else if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
      sendErrorProduction(error, req, res);
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpierdError();
      sendErrorProduction(error, req, res);
    } else {
      sendErrorProduction(err, req, res);
    }
  }
};
