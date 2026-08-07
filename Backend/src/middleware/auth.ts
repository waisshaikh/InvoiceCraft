import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
export const authenticate: RequestHandler = (req, _res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined;
  if (!token) return next(new AppError(401, 'Authentication required'));
  try { req.userId = (jwt.verify(token, env.JWT_SECRET) as { sub: string }).sub; next(); }
  catch { next(new AppError(401, 'Invalid or expired token')); }
};
