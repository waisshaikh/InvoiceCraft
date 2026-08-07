import type { RequestHandler } from 'express';
import { Document } from '../models/Document.js';
import { AppError } from '../utils/AppError.js';
export const duplicate: RequestHandler = async (req, res) => { const original = await Document.findOne({ _id: req.params.id, owner: req.userId }).lean(); if (!original) throw new AppError(404, 'Document not found'); const { _id, createdAt, updatedAt, ...copy } = original as any; const item = await Document.create({ ...copy, number: `${copy.number}-COPY-${Date.now().toString().slice(-5)}`, status: 'draft' }); res.status(201).json({ success: true, data: item }); };
export const archive: RequestHandler = async (req, res) => { const item = await Document.findOneAndUpdate({ _id: req.params.id, owner: req.userId }, { archived: true, status: 'archived' }, { new: true }); if (!item) throw new AppError(404, 'Document not found'); res.json({ success: true, data: item }); };
