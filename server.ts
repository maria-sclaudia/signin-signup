import './config/env';
import 'reflect-metadata';
import express, { request, response } from 'express';
import cors from 'cors';

import './database';
import { router } from './routes/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.listen(3333, () => console.log("Server is running"));