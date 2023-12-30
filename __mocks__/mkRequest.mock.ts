import request from 'supertest';
import { app } from '../src/app';

export function mkRequestMock() {
  return request(app);
}