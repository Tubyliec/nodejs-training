import express from 'express';
import mongoose from 'mongoose';
import { loadEnvFile } from 'node:process';

import { authRouter } from './modules/router/auth-router.js';

loadEnvFile();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      process.stdout.write(`Server is running on port ${PORT}\n`);
    });
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
  }
};

await startServer()