const notFound = (req, res, next) => {
  const error = new Error(`Not found! - ${req.originalUrl}`);
  error.status = 404;
  return next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log('middelware', err);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Check for Mongoose objectId error
  if (err.name == 'CastError' || err.kind == 'ObjectId') {
    err.message = 'Resource Not Found';
    statusCode = 404;
  }
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV == 'production' ? '' : err.stack,
  });
};

export { notFound, errorHandler };
