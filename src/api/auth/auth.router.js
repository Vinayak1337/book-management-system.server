import { Router } from 'express';
import { login, register } from './auth.controller.js';

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);

export default authRouter;
