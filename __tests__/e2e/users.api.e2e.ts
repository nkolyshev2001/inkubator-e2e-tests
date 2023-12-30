import { HTTP_STATUSES } from '../../src/constants';
import { CreateUserModel, UserViewModel } from '../../src/features/users';
import { UpdateUserModel } from '../../src/features/users/models/UpdateUserModel';
import { RouterPaths } from '../../src/routing';
import { UsersTestManager } from '../utils/managers/UsersTestManager';
import { mkRequestMock } from '../../__mocks__/mkRequest.mock';

describe(RouterPaths.users, () => {

  beforeAll(async () => {
    await mkRequestMock().delete(`${RouterPaths.tests}${RouterPaths.users}`);
  });

  it('should return 200 and empty array', async () => {
    await mkRequestMock()
      .get(RouterPaths.users)
      .expect(HTTP_STATUSES.OK_200, []);
  });

  it('shouldn`t create entity with incorrect input data', async () => {
    const mockInputData: CreateUserModel = { userName: '' };

    await mkTestManager().create(mockInputData, { statusCode: HTTP_STATUSES.BAD_REQUEST_400 })

    await mkRequestMock()
      .get(RouterPaths.users)
      .expect(HTTP_STATUSES.OK_200, []);
  })

  let mockCreatedEntity1: UserViewModel | undefined;
  let mockCreatedEntity2: UserViewModel | undefined;

  it('should create entity with correct input data', async () => {
    const mockInputData: CreateUserModel = { userName: 'Sergey' };

    const createRes = await mkTestManager().create(mockInputData);

    mockCreatedEntity1 = createRes.createdEntity;

    const getRes = await mkRequestMock()
      .get(RouterPaths.users)
      .expect(HTTP_STATUSES.OK_200, [mockCreatedEntity1]);
  });

  it('should create one more entity', async () => {
    const mockInputData: CreateUserModel = { userName: 'Regina' };

    const createRes = await mkTestManager().create(mockInputData);

    mockCreatedEntity2 = createRes.createdEntity;

    const getRes = await mkRequestMock()
      .get(RouterPaths.users)
      .expect(HTTP_STATUSES.OK_200, [mockCreatedEntity1, mockCreatedEntity2]);
  });

  it('should return 404 for not existing entity', async () => {
    await mkRequestMock()
      .get(`${RouterPaths.users}/-1`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return entity', async () => {
    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity1);
  });

  it ('shouldn`t update entity with incorrect input data', async () => {
    await mkRequestMock()
      .put(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .send({ userName: '' })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity1);
  });

  it ('shouldn`t update not existing entity', async () => {
    const mockInputData: UpdateUserModel = { userName: 'Sergey [updated]' };

    await mkRequestMock()
      .put(`${RouterPaths.users}/-1`)
      .send(mockInputData)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it ('should update entity with correct input data', async () => {
    const mockInputData: UpdateUserModel = { userName: 'Regina [updated]' };

    await mkRequestMock()
      .put(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .send(mockInputData)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .expect(
        HTTP_STATUSES.OK_200,
        { id: mockCreatedEntity1?.id, userName: mockInputData.userName }
      );

    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity2 );
  });

  it ('shouldn`t delete not existing entity', async () => {
    await mkRequestMock()
      .delete(`${RouterPaths.users}/-1`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  })

  it('should delete both entities', async () => {
    await mkRequestMock()
      .delete(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await mkRequestMock()
      .delete(`${RouterPaths.users}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.users}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await mkRequestMock()
      .get(RouterPaths.users)
      .expect(HTTP_STATUSES.OK_200, []);
  })
})

function mkTestManager() {
  return new UsersTestManager();
}