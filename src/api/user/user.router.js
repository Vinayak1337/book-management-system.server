import { Router } from 'express';
import { getUserProfile } from './user.controller.js';

const userRouter = Router();

userRouter.route('/').get(getUserProfile);

export default userRouter;