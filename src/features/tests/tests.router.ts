import express, { Request } from 'express';
import { EmptyResponse } from '../../types';
import { DBType } from '../../db';
import { HTTP_STATUSES } from '../../constants';
import { RouterPaths } from '../../routing';

export function getTestsRouter(db: DBType) {
  return express.Router()
    .delete(RouterPaths.courses, (req: Request, res: EmptyResponse) => {
      db.courses = [];

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    })
    .delete(RouterPaths.users, (req: Request, res: EmptyResponse) => {
      db.users = [];

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    })
    .delete(RouterPaths.usersCoursesBindings, (req: Request, res: EmptyResponse) => {
      db.users = [];

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
}