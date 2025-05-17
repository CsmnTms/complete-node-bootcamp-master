import Tour from '../models/tourModel.js';
import { APIFeatures } from '../utils/apiFeatures.js';

export { aliasTopTours, getAllTours, getTour, createTour, patchTour, deleteTour };

async function getAllTours(request, response) {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), request._parsedUrl.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    // SEND RESPONSE
    response.status(200).json({
      status: 'success',
      resultCount: tours.length,
      data: {
        tours
      },
    });
  } catch (err) {
    response.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function aliasTopTours(request, response, next) {
  request._parsedUrl.query = request._parsedUrl.query || {};
  request._parsedUrl.query.sort = '-ratingsAverage,price';
  request._parsedUrl.query.limit = '5';
  request._parsedUrl.query.fields = 'name,price,ratingsAverage,difficulty';

  console.log(request._parsedUrl.query.sort);

  next();
}

async function getTour(request, response) {
  try {
    const tour = await Tour.findById(request.params.id);
    // Tour.findOne({ _id: request.params.id }); // equivalent to the above

    response.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    response.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function createTour(request, response) {
  try {
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

async function patchTour(request, response) {
  try {
    const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });

    response.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function deleteTour(request, response) {
  try {
    await Tour.findByIdAndDelete(request.params.id);

    response.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}
