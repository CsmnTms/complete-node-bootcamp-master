// not exactly a controller but it kinda controls errors so whatever maybe think this more

export function errorHandler(error, request, response, next) {
  //console.log(error.stack);
  
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
}