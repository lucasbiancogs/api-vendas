import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import errorTreatment from '../middlewares/errorTreatment';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';

const connect = () => {
  createConnection()
    .then(async connection => {
    console.log('Database connected! ✅');

    connection.runMigrations();

    app.listen(3333, () => {
      console.log('Server started at port 33333! 🏆');
    });
  })
    .catch(err => {
      console.log('Database connection error! 🛑')
    });
};

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorTreatment);
app.use(errors());

connect();
