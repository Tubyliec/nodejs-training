import { User } from '../database/models/user.model.js';
import { Role } from '../database/models/role.model.js';
import bcrypt from 'bcryptjs';

export class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      
      let userRole = await Role.findOne({ value: 'User' });
      if (!userRole) {
        userRole = await Role.create({ value: 'User' });
      }

      const newUser = await User.create({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      return res.status(200).json({ message: 'User successfully created' });
    } catch (error) {
      process.stderr.write(`Error: ${error}\n`);
      console.log(error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
    } catch (error) {
      process.stderr.write(`Error: ${error.message}\n`);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      res.json({ message: 'getUsers' });
    } catch (error) {}
  }
}