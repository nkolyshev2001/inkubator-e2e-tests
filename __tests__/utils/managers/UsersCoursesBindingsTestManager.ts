import { UserViewModel } from '../../../src/features/users';
import request from 'supertest';
import { app } from '../../../src/app';
import { RouterPaths } from '../../../src/routing';
import { TestManager, TestManagerCreateResponse, TestManagerRequestOptions } from './internal/TestManager';
import { HTTP_STATUSES } from '../../../src/constants';
import { CreateUserCourseBindingModel, UserCourseBindingViewModel } from '../../../src/features/users-courses-bindings';

export class UsersCoursesBindingsTestManager extends TestManager {
  public constructor() {
    super(RouterPaths.usersCoursesBindings);
  }

  public async create(mock: CreateUserCourseBindingModel, options?: TestManagerRequestOptions): Promise<TestManagerCreateResponse<UserCourseBindingViewModel>> {
    const statusCode = options?.statusCode ?? HTTP_STATUSES.CREATED_201;

    const response = await this.request().post(this.path).send(mock).expect(options?.statusCode ?? HTTP_STATUSES.CREATED_201);

    switch (statusCode) {
      case HTTP_STATUSES.CREATED_201: {
        const mockCreatedEntity = response.body;

        expect(response.body).toEqual({
          userId: mockCreatedEntity.userId,
          courseId: mockCreatedEntity.courseId,
          date: mockCreatedEntity.date,
          userName: mockCreatedEntity.userName,
          courseTitle: mockCreatedEntity.courseTitle,
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