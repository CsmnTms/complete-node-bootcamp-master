import { Router } from 'express';
import { getAllUsers, createUser, getUser, patchUser, deleteUser } from '../controllers/userController.js';

const userRouter = Router();

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);
userRouter.route('/:id')
  .get(getUser)
  .patch(patchUser)
  .delete(deleteUser);

export default userRouter;