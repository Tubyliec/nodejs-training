import Router from 'express';
import { authController } from './auth-controller.js';

const controller = new authController();
export const authRouter = new Router();

authRouter.post('/registration', controller.registration);
authRouter.post('/login', controller.login);
authRouter.get('/users', controller.getUsers);