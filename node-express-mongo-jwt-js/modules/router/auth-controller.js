import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { UserModel } from '../database/models/user.model.js';
import { RoleModel } from '../database/models/role.model.js';
import {generateToken} from "../jwt/generate-token.js";

export class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, password } = req.body;
      const candidate = await UserModel.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      
      let userRole = await RoleModel.findOne({ value: 'User' });
      if (!userRole) {
        userRole = await RoleModel.create({ value: 'User' });
      }

      await UserModel.create({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      return res.status(200).json({ message: 'User successfully created' });
    } catch (error) {
      process.stderr.write(`Error: ${error}\n`);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }
      const token = generateToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      process.stderr.write(`Error: ${error.message}\n`);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      process.stderr.write(`Error: ${error.message}\n`);
      res.status(400).json({ message: 'Get users error' });
    }
  }
}