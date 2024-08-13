import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import UserRouter from './routes/user';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/itl').then((x) => {
  console.log('Connected to MongoDB:', x.connection.name);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({ origin: '*', credentials: process.env.APP_ENV === 'production' }),
);

// @ts-ignore
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(function (tokens, req, res) {
    return [
      chalk.hex('#34ace0').bold(tokens.method(req, res)),
      chalk.hex('#ff5252').bold(tokens.url(req, res)),
      chalk.hex('#ffb142').bold(tokens.status(req, res)),
      chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
      chalk.hex('#f78fb3').bold(tokens.body(req, res)),
      '\n',
    ].join(' ');
  }),
);

app.use(helmet());

// Routes
app.use('/api', UserRouter);

app.use('/', (req, res) => {
  res.send('Welcome to ITL API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
