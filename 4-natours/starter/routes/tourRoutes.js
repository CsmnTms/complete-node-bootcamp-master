const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.route('/') // routes are also underlying middlewares, i think
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;