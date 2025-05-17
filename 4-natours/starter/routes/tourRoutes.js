import { Router } from 'express';
import * as tourController from '../controllers/tourController.js';

const router = Router();

router.route('/top-5-cheap') // route aliasing
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/stats') 
  .get(tourController.getTourStats);

router.route('/') // routes are also underlying middlewares, i think
  .get(tourController.getAllTours)
  .post(tourController.createTour);
  
router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

export default router;