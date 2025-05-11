const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID); // this is a middleware that runs before the route handler

router.route('/') // routes are also underlying middlewares, i think
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;