import express from 'express';
import Router from './config/router.js';
import cors from 'cors';
import { PORT } from './config/environment.js';
import { connectDb } from './db/helpers.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', Router);

async function startServer() {
  try {
    await connectDb();
    console.log('connected to mongodb');
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  } catch (err) {
    console.log('ERROR', err);
  }
}

startServer();
