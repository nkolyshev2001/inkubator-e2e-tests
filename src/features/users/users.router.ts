import { EmptyResponse, RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../../types';
import express, { Request, Response } from 'express';
import { UserType, DBType } from '../../db';
import { HTTP_STATUSES } from '../../constants';
import { CreateUserModel, QueryUsersModel, URIParamsUserIdModel, UserViewModel } from './models';
import { UpdateUserModel } from './models/UpdateUserModel';

export function getUsersRouter(db: DBType) {
  return express.Router()
    .get('/', (req: RequestWithQuery<QueryUsersModel>, res: Response<UserViewModel[]>) => {
    let foundUsers = db.users;

    if (req.query.userName) {
      foundUsers = foundUsers.filter(user => user.userName.includes(req.query.userName as string));
    }

    res.json(foundUsers.map(user => new UserViewModel(user)));
  })
    .get('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel>) => {
      const foundUser = db.users.find(user => user.id === +req.params.id);

      if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(new UserViewModel(foundUser));
    })
    .post('/', (req: RequestWithBody<CreateUserModel>, res: Response<UserViewModel>) => {
      if (!req.body.userName) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const createdUser: UserType = {
        id: +(new Date()),
        userName: req.body.userName,
      }

      db.users.push(createdUser);

      res
        .status(HTTP_STATUSES.CREATED_201)
        .json(new UserViewModel(createdUser));
    })
    .put('/:id', (req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>, res: EmptyResponse) => {
      if (!req.body.userName) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const foundUser = db.users.find(user => user.id === +req.params.id);

      if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      foundUser.userName = req.body.userName;

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    })
    .delete('/:id', (req: Request<URIParamsUserIdModel>, res: EmptyResponse) => {
      const foundUser = db.users.find(user => user.id === +req.params.id);

      if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      db.users = db.users.filter(user => user.id !== +req.params.id);

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
}