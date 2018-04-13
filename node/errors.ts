import { Response } from 'express';

export interface ErrorData {
  err: string;
  msg: string;
  statusCode: number;
}

export function respondError(
  res: Response,
  err: ErrorData,
  overrides?: { err?: string, msg?: string, statusCode?: number }
): void {
  overrides = overrides || {};
  res.status(overrides.statusCode || err.statusCode).json({
    error: overrides.err || err.err,
    message: overrides.msg || err.msg
  });
}

export const badRequest: ErrorData = {
  err: 'bad_request',
  msg: 'given request was not valid',
  statusCode: 400
};
export const unauthorized: ErrorData = {
  err: 'unauthorized',
  msg: 'sender was not authorised to make this request',
  statusCode: 403
};
export const notFound: ErrorData = {
  err: 'not_found',
  msg: 'given resource was not found',
  statusCode: 404
};
export const serverError: ErrorData = {
  err: 'server_error',
  msg: 'the server encountered an internal error',
  statusCode: 500
};
