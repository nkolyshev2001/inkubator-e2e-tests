import { RouterPaths } from '../../../../src/routing';
import { HTTP_STATUSES } from '../../../../src/constants';
import { mkRequestMock } from '../../../../__mocks__/mkRequest.mock';
import request from 'supertest';

export interface TestManagerRequestOptions {
  statusCode?: typeof HTTP_STATUSES[keyof typeof HTTP_STATUSES]
}

export interface TestManagerCreateResponse<Entity> {
  response: request.Response;
  createdEntity?: Entity;
}

export abstract class TestManager {
  protected constructor(protected readonly path: typeof RouterPaths[keyof typeof RouterPaths]) {}

  protected abstract create(mock: object, options?: TestManagerRequestOptions): Promise<TestManagerCreateResponse<object>>;

  protected request() {
    return mkRequestMock();
  }
}

