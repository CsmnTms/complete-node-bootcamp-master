import { Router } from 'express';
import { getAllTours, checkBody, createTour, getTour, patchTour, deleteTour } from '../controllers/tourController.js';

const router = Router();

// router.param('id', checkID); // this is a middleware that runs before the route handler

router.route('/') // routes are also underlying middlewares, i think
  .get(getAllTours)
  .post(checkBody, createTour);
router.route('/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour);

export default router;