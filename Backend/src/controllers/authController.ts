import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const tokenFor = (id: string) => jwt.sign({ sub: id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] });
export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email })) throw new AppError(409, 'An account with this email already exists');
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
  res.status(201).json({ success: true, data: { token: tokenFor(user.id), user: { id: user.id, name, email } } });
};
export const login: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) throw new AppError(401, 'Invalid email or password');
  res.json({ success: true, data: { token: tokenFor(user.id), user: { id: user.id, name: user.name, email: user.email } } });
};
export const me: RequestHandler = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw new AppError(404, 'User not found');
  res.json({ success: true, data: user });
};
