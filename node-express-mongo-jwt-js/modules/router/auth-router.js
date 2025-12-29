import Router from 'express';
import { AuthController } from './auth-controller.js';
import { check } from 'express-validator';

const controller = new AuthController();
export const authRouter = new Router();

authRouter.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').isLength({ min: 6, max: 20 }),
  ],
  controller.registration
);
authRouter.post('/login', controller.login);
authRouter.get('/users', controller.getUsers);