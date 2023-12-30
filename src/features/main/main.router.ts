import { DBType } from '../../db';
import express from 'express';
import { getCoursesRouter } from '../courses/courses.router';
import { getTestsRouter } from '../tests/tests.router';
import { getUsersRouter } from '../users/users.router';
import { RouterPaths } from '../../routing/constants';
import { getUsersCoursesBindingsRouter } from '../users-courses-bindings';

export function getRouter(db: DBType) {
  return express.Router()
    .use(RouterPaths.tests, getTestsRouter(db))
    .use(RouterPaths.courses, getCoursesRouter(db))
    .use(RouterPaths.users, getUsersRouter(db))
    .use(RouterPaths.usersCoursesBindings, getUsersCoursesBindingsRouter(db));
}