// Third-party modules
const express = require('express');
const morgan = require('morgan');

// Local modules
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// App startup
const app = express();

// Middlewares
app.use(morgan('dev')); // logging middleware, logs all requests to the console
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body, otherwise no body is received
app.use(express.static(`${__dirname}/public`)); // serves static files from the public directory

app.use((request, response, next) => {
  console.log("Hello from the middleware");
  next(); // this is important, otherwise the request will hang
});
app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

// ROUTES (route mounting)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;


