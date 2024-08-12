import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/itl').then((x) => {
  console.log('Connected to MongoDB:', x.connection.name);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({origin:'*',credentials: process.env.APP_ENV === 'production'}),
);
// @ts-ignore
morgan.token('body', (req, res) => JSON.stringify(req.body));
// app.use(MorganMiddleware);

app.use(helmet());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
