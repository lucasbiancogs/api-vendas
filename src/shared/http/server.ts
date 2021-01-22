import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorTreatment from '../middlewares/errorTreatment';
import '../typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorTreatment);

app.listen(3333, () => {
    console.log('Server started at port 33333! 🏆');
});
