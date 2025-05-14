import Tour from '../models/tourModel.js';

export function checkBody(request, response, next) {
  if (!request.body.name || !request.body.price) {
    return response.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
}

export function getAllTours(request, response) {
  console.log(request.requestTime);
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    // resultCount: tours.length,
    // data: {
    //   tours
    // },
  });
}

export function getTour(request, response) {
  // const tour = tours.find(t => t.id === +request.params.id);

  // response.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
}

export function createTour(request, response) {
  response.status(201).json({
      status: 'success',
      // data: {
      //   tour: newTour,
      // },
    });
}

export function patchTour(request, response) {
  response.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
}

export function deleteTour(request, response) {
  response.status(204).json({
    status: 'success',
    data: null,
  });
}