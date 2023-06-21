const errorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  //assign all properties on err to the error object
  let error = { ...err };
  error.message = err.message;
  //console.log('error', error);

  //Duplicate key error
  if (parseInt(err.code) === 23505) {
    error = new errorResponse('Duplicate Key error', 400);
  }

  // Validation error handling
  if (parseInt(err.code) === 23514) {
    error = new errorResponse('Invalid details specified', 400);
  }

  // send the generic error response with error details
  res.status(error.statusCode || 500).send({
    status: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
