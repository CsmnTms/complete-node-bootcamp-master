import qs from 'qs';
import Tour from '../models/tourModel.js';

export { getAllTours, getTour, createTour, patchTour, deleteTour };

async function getAllTours(request, response) {
  try {
    // BUILD QUERY
    const queryObj = qs.parse(request._parsedUrl.query);
    const excludedFields = ['page', 'sort', 'limit', 'fields']; 
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (request.query.sort) {
      const sortBy = request.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }

    // Field limiting
    if (request.query.fields) {
      const fields = request.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query.select('-__v');
    }

    // EXECUTE QUERY
    const tours = await query

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
