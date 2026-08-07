import type { RequestHandler } from 'express';
import { BusinessProfile } from '../models/BusinessProfile.js';
export const getProfile: RequestHandler = async (req, res) => res.json({ success: true, data: await BusinessProfile.findOne({ owner: req.userId }) });
export const updateProfile: RequestHandler = async (req, res) => res.json({ success: true, data: await BusinessProfile.findOneAndUpdate({ owner: req.userId }, { ...req.body, owner: req.userId }, { upsert: true, new: true, runValidators: true }) });
