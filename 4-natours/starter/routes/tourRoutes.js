import { Router } from 'express';
import { aliasTopTours, getAllTours, createTour, getTour, patchTour, deleteTour } from '../controllers/tourController.js';

const router = Router();

router.route('/top-5-cheap') // route aliasing
  .get(aliasTopTours, getAllTours);

router.route('/') // routes are also underlying middlewares, i think
  .get(getAllTours)
  .post(createTour);
  
router.route('/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour);

export default router;