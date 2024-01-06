import { Router } from 'express';
import { login } from './auth.controller.js';

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(login);

export default authRouter;
