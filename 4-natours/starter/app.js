// Core Node.js modules
const fs = require('fs');

// Third-party modules
const express = require('express');

// App startup
const app = express();

// Middleware
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body, otherwise no body is received

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
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

// these are called route handlers:
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
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

