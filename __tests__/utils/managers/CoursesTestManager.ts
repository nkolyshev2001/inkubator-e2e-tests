import { CreateUserModel, UserViewModel } from '../../../src/features/users';
import request from 'supertest';
import { app } from '../../../src/app';
import { RouterPaths } from '../../../src/routing';
import { TestManager, TestManagerCreateResponse, TestManagerRequestOptions } from './internal/TestManager';
import { HTTP_STATUSES } from '../../../src/constants';
import { UserType } from '../../../src/db';
import { CourseViewModel, CreateCourseModel } from '../../../src/features/courses';

export class CoursesTestManager extends TestManager {
  public constructor() {
    super(RouterPaths.courses);
  }

  public async create(mock: CreateCourseModel, options?: TestManagerRequestOptions): Promise<TestManagerCreateResponse<CourseViewModel>> {
    const statusCode = options?.statusCode ?? HTTP_STATUSES.CREATED_201;

    const response = await this.request().post(this.path).send(mock).expect(options?.statusCode ?? HTTP_STATUSES.CREATED_201);

    switch (statusCode) {
      case HTTP_STATUSES.CREATED_201: {
        const mockCreatedEntity = response.body;

        expect(response.body).toEqual({
          id: expect.any(Number),
          title: mockCreatedEntity.title,
        });
      }
    }

    return  {
      response,
      createdEntity: response.body
    }
  }

}

function mkRequest() {
  return request(app);
}