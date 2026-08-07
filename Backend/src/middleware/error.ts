import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from '../utils/AppError.js';
export const notFound: RequestHandler = (req, _res, next) => next(new AppError(404, `Route ${req.method} ${req.path} not found`));
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error instanceof AppError ? error.statusCode : error?.name === 'ValidationError' ? 422 : 500;
  res.status(status).json({ success: false, message: status === 500 ? 'Internal server error' : error.message, ...(error instanceof AppError && error.details ? { details: error.details } : {}) });
};
