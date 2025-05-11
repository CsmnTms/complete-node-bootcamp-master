const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

exports.getAllTours = (request, response) => {
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
exports.getTour = (request, response) => {
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
exports.createTour = (request, response) => {
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
exports.patchTour = (request, response) => {
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
exports.deleteTour = (request, response) => {
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