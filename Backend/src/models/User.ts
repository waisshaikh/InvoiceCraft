import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: { currency: { type: String, default: 'INR' }, theme: { type: String, default: 'system' } },
}, { timestamps: true });

export const User = model('User', userSchema);
