/////////////////////////////////////////////////////////////////////////////////
/// This is used to configure everything that has to do with the express app. ///
///    More general node.JS related stuff is found in the server.js file.     ///
/////////////////////////////////////////////////////////////////////////////////

// Third-party modules
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local modules
import {AppError} from './utils/appError.js';
import {errorHandler} from './controllers/errorController.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

// App startup
const app = express();

// MIDDLEWARES
console.log(`///^^^^^^^^^^^^^^^^^^^^^^^^^^^ App mode: ${process.env.NODE_ENV.toUpperCase()} ^^^^^^^^^^^^^^^^^^^^^^^^^^^///`); // this is the node process env vars

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logging middleware, logs all requests to the console
}

app.use(bodyParser.json()); // parses incoming requests with JSON payloads

app.use(express.static(`${__dirname}/public`)); // serves static files from the public directory
app.use(express.static(`${__dirname}/public`)); // serves static files from the public directory

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

// ROUTES (route mounting)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// Catch all unhandled routes, has to be last middleware
app.use((request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

export default app;
