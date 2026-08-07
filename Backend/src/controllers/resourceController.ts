import type { Model } from 'mongoose';
import type { RequestHandler } from 'express';
import { AppError } from '../utils/AppError.js';

export const resourceController = (Model: Model<any>) => ({
  list: (async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1), limit = Math.min(Number(req.query.limit) || 20, 100);
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const filter: Record<string, unknown> = { owner: req.userId, archived: req.query.archived === 'true' };
    if (search) filter.$or = ['name','number','email','sku'].map((key) => ({ [key]: { $regex: search, $options: 'i' } }));
    if (req.query.type) filter.type = req.query.type;
    const [items, total] = await Promise.all([Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Model.countDocuments(filter)]);
    res.json({ success: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } });
  }) as RequestHandler,
  get: (async (req, res) => { const item = await Model.findOne({ _id: req.params.id, owner: req.userId }); if (!item) throw new AppError(404, 'Resource not found'); res.json({ success: true, data: item }); }) as RequestHandler,
  create: (async (req, res) => { const item = await Model.create({ ...req.body, owner: req.userId }); res.status(201).json({ success: true, data: item }); }) as RequestHandler,
  update: (async (req, res) => { const item = await Model.findOneAndUpdate({ _id: req.params.id, owner: req.userId }, req.body, { new: true, runValidators: true }); if (!item) throw new AppError(404, 'Resource not found'); res.json({ success: true, data: item }); }) as RequestHandler,
  remove: (async (req, res) => { const item = await Model.findOneAndDelete({ _id: req.params.id, owner: req.userId }); if (!item) throw new AppError(404, 'Resource not found'); res.status(204).send(); }) as RequestHandler,
});
