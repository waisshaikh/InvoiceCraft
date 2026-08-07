import { Schema, model } from 'mongoose';
const address = { line1: String, line2: String, city: String, state: String, postalCode: String, country: String };
const schema = new Schema({ owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }, name: { type: String, required: true, trim: true }, email: String, phone: String, gstin: String, billingAddress: address, shippingAddress: address, archived: { type: Boolean, default: false } }, { timestamps: true });
schema.index({ owner: 1, name: 1 });
export const Customer = model('Customer', schema);
