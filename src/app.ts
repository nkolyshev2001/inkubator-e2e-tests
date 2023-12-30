import express from 'express';
import db from './db/db';
import { getRouter } from './features/main';

export const app = express();
export const bodyMiddleware = express.json();

app.use(bodyMiddleware);

app.use('/', getRouter(db));
