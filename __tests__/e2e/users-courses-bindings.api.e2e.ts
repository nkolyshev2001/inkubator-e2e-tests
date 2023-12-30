import { RouterPaths } from '../../src/routing';
import { UsersTestManager } from '../utils/managers/UsersTestManager';
import { mkRequestMock } from '../../__mocks__/mkRequest.mock';
import { UsersCoursesBindingsTestManager } from '../utils/managers/UsersCoursesBindingsTestManager';
import { CoursesTestManager } from '../utils/managers/CoursesTestManager';
import { HTTP_STATUSES } from '../../src/constants';

describe(RouterPaths.users, () => {

  beforeEach(async () => {
    await mkRequestMock().delete(`${RouterPaths.tests}${RouterPaths.usersCoursesBindings}`);
  });

  it('should create user-course-binding with correct input data', async () => {
    const { createdEntity: user } = await mkUsersTestManager().create({ userName: 'Sergey' });
    const { createdEntity: course } = await mkCoursesTestManager().create({ title: 'Literature' });

    await mkUsersCoursesBindingsTestManager().create({ userId: user!.id, courseId: course!.id });
  });

  it('shouldn`t create user-course-binding if it already exists', async () => {
    const { createdEntity: user } = await mkUsersTestManager().create({ userName: 'Sergey' });
    const { createdEntity: course } = await mkCoursesTestManager().create({ title: 'Literature' });

    await mkUsersCoursesBindingsTestManager().create({ userId: user!.id, courseId: course!.id });
    await mkUsersCoursesBindingsTestManager().create(
      { userId: user!.id, courseId: course!.id },
      { statusCode: HTTP_STATUSES.BAD_REQUEST_400 }
    );
  });

  it('shouldn`t create user-course-binding if user not found', async () => {
    const { createdEntity: course } = await mkCoursesTestManager().create({ title: 'Literature' });

    await mkUsersCoursesBindingsTestManager().create(
      { userId: -1, courseId: course!.id },
      { statusCode: HTTP_STATUSES.NOT_FOUND_404 }
    );
  });

  it('shouldn`t create user-course-binding if course not found', async () => {
    const { createdEntity: user } = await mkUsersTestManager().create({ userName: 'Sergey' });

    await mkUsersCoursesBindingsTestManager().create(
      { userId: user!.id, courseId: -1 },
      { statusCode: HTTP_STATUSES.NOT_FOUND_404 }
    );
  });
})

function mkUsersTestManager() {
  return new UsersTestManager();
}

function mkCoursesTestManager() {
  return new CoursesTestManager();
}

function mkUsersCoursesBindingsTestManager() {
  return new UsersCoursesBindingsTestManager();
}