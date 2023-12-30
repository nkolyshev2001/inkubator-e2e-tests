import { Request, Response } from 'express';

export type RequestWithBody<B> = Request<{}, {}, B>;
export type RequestWithParams<P> = Request<P>;
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B>;

export type EmptyResponse = Response<undefined>;