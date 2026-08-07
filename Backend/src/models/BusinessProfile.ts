import { Schema, model } from 'mongoose';

const addressSchema = new Schema({ line1: String, line2: String, city: String, state: String, postalCode: String, country: { type: String, default: 'India' } }, { _id: false });
const businessProfileSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  businessName: { type: String, required: true, trim: true }, legalName: String, email: String, phone: String,
  gstin: String, pan: String, address: addressSchema,
  bank: { accountName: String, accountNumber: String, bankName: String, ifsc: String, branch: String },
  logoUrl: String, signatureUrl: String, upiId: String, upiQrUrl: String,
}, { timestamps: true });
export const BusinessProfile = model('BusinessProfile', businessProfileSchema);
