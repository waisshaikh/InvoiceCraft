import { Schema, model } from 'mongoose';
const schema = new Schema({ owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }, name: { type: String, required: true, trim: true }, sku: String, description: String, unit: { type: String, default: 'pcs' }, price: { type: Number, required: true, min: 0 }, taxRate: { type: Number, default: 0, min: 0, max: 100 }, hsnSac: String, archived: { type: Boolean, default: false } }, { timestamps: true });
schema.index({ owner: 1, name: 1 });
export const Product = model('Product', schema);
