import { EmptyResponse, RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../../types';
import { CourseViewModel, CreateCourseModel, QueryCoursesModel, URIParamsCourseIdModel } from './models';
import express, { Request, Response } from 'express';
import { UpdateCourseModel } from './models/UpdateCourseModel';
import { HTTP_STATUSES } from '../../constants';
import { CourseType, DBType } from '../../db';

export function getCoursesRouter(db: DBType) {
  return express.Router()
    .get('/', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
      foundCourses = foundCourses.filter(course => course.title.includes(req.query.title as string));
    }

    res.json(foundCourses.map(course => new CourseViewModel(course)));
  })
    .get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
      const foundCourse = db.courses.find(course => course.id === +req.params.id);

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(new CourseViewModel(foundCourse));
    })
    .post('/', (req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const createdCourse: CourseType = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 0,
      }

      db.courses.push(createdCourse);

      res
        .status(HTTP_STATUSES.CREATED_201)
        .json(new CourseViewModel(createdCourse));
    })
    .put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res: EmptyResponse) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const foundCourse = db.courses.find(course => course.id === +req.params.id);

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      foundCourse.title = req.body.title;

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    })
    .delete('/:id', (req: Request<URIParamsCourseIdModel>, res: EmptyResponse) => {
      const foundCourse = db.courses.find(course => course.id === +req.params.id);

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      db.courses = db.courses.filter(course => course.id !== +req.params.id);

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
}