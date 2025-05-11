// Core Node.js modules
const fs = require('fs');

// Third-party modules
const express = require('express');
const morgan = require('morgan');

// App startup
const app = express();

// Middleware
app.use(morgan('dev')); // logging middleware, logs all requests to the console
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body, otherwise no body is received

app.use((request, response, next) => {
  console.log("Hello from the middleware");
  next(); // this is important, otherwise the request will hang
});
app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

// ROUTE HANDLERS
const getAllTours = (request, response) => {
  console.log(request.requestTime);
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    resultCount: tours.length,
    data: {
      tours
    },
  });
}
const getTour = (request, response) => {
  console.log(request.params);
  const tour = tours.find(t => t.id === +request.params.id);

  // if (+request.params.id > tours.length) {
  if (!tour) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
}
const createTour = (request, response) => {
  // console.log(request.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      response.status(500).json({
        status: 'fail',
        message: 'Could not save data to file',
      });
    }
    response.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
}
const patchTour = (request, response) => {
  // console.log(request.params);
  // console.log(request.body);

  if (!tours[request.params.id]) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = Object.assign(tours[request.params.id], request.body);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      response.status(500).json({
        status: 'fail',
        message: 'Could not save data to file',
      });
    }
    response.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  });
}
const deleteTour = (request, response) => {
  // console.log(request.params);
  // console.log(request.body);

  if (!tours[request.params.id]) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours.splice(request.params.id, 1);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      response.status(500).json({
        status: 'fail',
        message: 'Could not save data to file',
      });
    }
    response.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

// ROUTES
app.route('/api/v1/tours') // routes are also underlyinh middlewares, i think
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour);

const port = 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});

