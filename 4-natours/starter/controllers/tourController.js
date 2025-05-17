import Tour from '../models/tourModel.js';
import { APIFeatures } from '../utils/apiFeatures.js';

export async function getAllTours(request, response) {
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

export async function aliasTopTours(request, response, next) {
  request._parsedUrl.query = request._parsedUrl.query || {};
  request._parsedUrl.query.sort = '-ratingsAverage,price';
  request._parsedUrl.query.limit = '5';
  request._parsedUrl.query.fields = 'name,price,ratingsAverage,difficulty';

  console.log(request._parsedUrl.query.sort);

  next();
}

export async function getTour(request, response) {
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

export async function createTour(request, response) {
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

export async function patchTour(request, response) {
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

export async function deleteTour(request, response) {
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

export async function getTourStats(request, response) {
  try {
    const stats = await Tour.aggregate([
      {
        $match : { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },

        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    response.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

export async function getMonthlyPlan(request, response) {
  try {
    const year = +request.params.year;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0,
          numTourStarts: 1,
          month: 1,
          tours: 1
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    response.status(200).json({
      status: 'success',
      resultCount: plan.length,
      data: {
        plan
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}