import Tour from '../models/tourModel.js';

export { getAllTours, getTour, createTour, patchTour, deleteTour };

function getAllTours(request, response) {
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

function getTour(request, response) {
  // const tour = tours.find(t => t.id === +request.params.id);

  // response.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
}

async function createTour(request, response) {
  try {
    console.log(request.body);
    const newTour = await Tour.create(request.body);

    response.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

function patchTour(request, response) {
  response.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
}

function deleteTour(request, response) {
  response.status(204).json({
    status: 'success',
    data: null,
  });
}
