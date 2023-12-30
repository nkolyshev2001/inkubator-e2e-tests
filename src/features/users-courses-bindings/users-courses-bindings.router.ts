import { DBType, UserCourseBindingsType, UserType } from '../../db';
import express, { Response } from 'express';
import { RequestWithBody } from '../../types';
import { CreateUserCourseBindingModel } from './models/CreateUserCourseBindingModel';
import { UserCourseBindingViewModel } from './models';
import { HTTP_STATUSES } from '../../constants';

export function getUsersCoursesBindingsRouter(db: DBType) {
  return express.Router()
    .post('/', (req: RequestWithBody<CreateUserCourseBindingModel>, res: Response<UserCourseBindingViewModel>) => {
      const user = db.users.find(u => u.id === +req.body.userId);

      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

        return;
      }

      const course = db.courses.find(c => c.id === +req.body.courseId);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

        return;
      }

      const userCourseBindingDuplicate = db.usersCourseBindings.find(b => b.courseId == course.id && b.userId === user.id);

      if (userCourseBindingDuplicate) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);

        return;
      }

      const userCourseBinding: UserCourseBindingsType = {
        userId: user.id,
        courseId: course.id,
        date: new Date(),
      }

      db.usersCourseBindings.push(userCourseBinding);

      res.status(201).json(new UserCourseBindingViewModel(userCourseBinding, user, course));
    })
}