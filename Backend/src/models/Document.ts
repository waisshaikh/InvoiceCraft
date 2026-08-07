import { Schema, model } from 'mongoose';
const itemSchema = new Schema({ description: { type: String, required: true }, hsnSac: String, quantity: { type: Number, min: 0, required: true }, unit: { type: String, default: 'pcs' }, rate: { type: Number, min: 0, required: true }, taxRate: { type: Number, min: 0, max: 100, default: 0 }, discount: { type: Number, min: 0, default: 0 }, amount: { type: Number, required: true } }, { _id: true });
const schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['invoice','quotation','gst-invoice','proforma','receipt','purchase-order','delivery-challan','estimate','bill','salary-slip'], required: true, index: true },
  number: { type: String, required: true }, status: { type: String, enum: ['draft','sent','viewed','accepted','paid','overdue','cancelled','archived'], default: 'draft' },
  issueDate: { type: Date, default: Date.now }, dueDate: Date, currency: { type: String, default: 'INR' },
  customer: { name: String, email: String, phone: String, gstin: String, address: String }, items: [itemSchema],
  subtotal: { type: Number, default: 0 }, discount: { type: Number, default: 0 }, tax: { type: Number, default: 0 }, total: { type: Number, default: 0 }, amountPaid: { type: Number, default: 0 },
  notes: String, terms: String, template: { type: String, default: 'classic' }, archived: { type: Boolean, default: false },
}, { timestamps: true });
schema.index({ owner: 1, type: 1, createdAt: -1 });
schema.index({ owner: 1, number: 1 }, { unique: true });
export const Document = model('Document', schema);
export const Invoice = Document.discriminator('Invoice', new Schema({}, { discriminatorKey: 'kind' }));
export const Quotation = Document.discriminator('Quotation', new Schema({}, { discriminatorKey: 'kind' }));
export const Receipt = Document.discriminator('Receipt', new Schema({}, { discriminatorKey: 'kind' }));
export const PurchaseOrder = Document.discriminator('PurchaseOrder', new Schema({}, { discriminatorKey: 'kind' }));
