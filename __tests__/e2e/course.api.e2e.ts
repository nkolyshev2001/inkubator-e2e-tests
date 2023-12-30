import { HTTP_STATUSES } from '../../src/constants';
import { RouterPaths } from '../../src/routing';
import { CourseViewModel, CreateCourseModel } from '../../src/features/courses';
import { UpdateCourseModel } from '../../src/features/courses/models/UpdateCourseModel';
import { CoursesTestManager } from '../utils/managers/CoursesTestManager';
import { mkRequestMock } from '../../__mocks__/mkRequest.mock';

describe(RouterPaths.courses, () => {

  beforeAll(async () => {
    await mkRequestMock().delete(`${RouterPaths.tests}${RouterPaths.courses}`);
  });

  it('should return 200 and empty array', async () => {
    await mkRequestMock()
      .get(RouterPaths.courses)
      .expect(HTTP_STATUSES.OK_200, []);
  });

  it('shouldn`t create entity with incorrect input data', async () => {
    const mockInputData: CreateCourseModel = { title: '' };

    await mkTestManager().create(mockInputData, { statusCode: HTTP_STATUSES.BAD_REQUEST_400 });

    await mkRequestMock()
      .get(RouterPaths.courses)
      .expect(HTTP_STATUSES.OK_200, []);
  })

  let mockCreatedEntity1: CourseViewModel | undefined;
  let mockCreatedEntity2: CourseViewModel | undefined;

  it('should create entity with correct input data', async () => {
    const mockInputData: CreateCourseModel = { title: 'literature' };

    const res = await mkTestManager().create(mockInputData);

    mockCreatedEntity1 = res.createdEntity;

    await mkRequestMock()
      .get(RouterPaths.courses)
      .expect(HTTP_STATUSES.OK_200, [mockCreatedEntity1]);
  });

  it('should create one more entity', async () => {
    const mockInputData: CreateCourseModel = { title: 'it technologies' };

    const res = await mkTestManager().create(mockInputData);

    mockCreatedEntity2 = res.createdEntity;

    await mkRequestMock()
      .get(RouterPaths.courses)
      .expect(HTTP_STATUSES.OK_200, [mockCreatedEntity1, mockCreatedEntity2]);
  });

  it('should return 404 for not existing entity', async () => {
    await mkRequestMock()
      .get(`${RouterPaths.courses}/-1`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it('should return entity', async () => {
    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity1);
  });

  it ('shouldn`t update entity with incorrect input data', async () => {
    await mkRequestMock()
      .put(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .send({ title: '' })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity1);
  });

  it ('shouldn`t update not existing entity', async () => {
    const mockInputData: UpdateCourseModel = { title: 'literature advanced' };

    await mkRequestMock()
      .put(`${RouterPaths.courses}/-1`)
      .send(mockInputData)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it ('should update entity with correct input data', async () => {
    const mockInputData: UpdateCourseModel = { title: 'literature advanced' };

    await mkRequestMock()
      .put(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .send(mockInputData)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .expect(
        HTTP_STATUSES.OK_200,
        { id: mockCreatedEntity1?.id, title: mockInputData.title }
      );

    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.OK_200, mockCreatedEntity2 );
  });

  it ('shouldn`t delete not existing entity', async () => {
    await mkRequestMock()
      .delete(`${RouterPaths.courses}/-1`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  })

  it('should delete both enitities', async () => {
    await mkRequestMock()
      .delete(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity1?.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await mkRequestMock()
      .delete(`${RouterPaths.courses}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await mkRequestMock()
      .get(`${RouterPaths.courses}/${mockCreatedEntity2?.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await mkRequestMock()
      .get(RouterPaths.courses)
      .expect(HTTP_STATUSES.OK_200, []);
  })
})

function mkTestManager() {
  return new CoursesTestManager();
}