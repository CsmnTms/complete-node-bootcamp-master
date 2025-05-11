// Core Node.js modules
const fs = require('fs');

// Third-party modules
const express = require('express');

// App startup
const app = express();

// Middleware
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body, otherwise no body is received

// app.get('/', (request, response) => {
//   response.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
// });

// app.post('/', (request, response) => {
//   response.status(200).json({ message: 'You can post to this endpoint', app: 'Natours' });
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

// this is called a route handler:
app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    resultCount: tours.length,
    data: {
      tours
    },
  });
});

app.get('/api/v1/tours/:id', (request, response) => {
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
});

app.post('/api/v1/tours', (request, response) => {
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
});

const port = 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});

