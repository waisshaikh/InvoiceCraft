export type DocumentType = 'invoice'|'quotation'|'gst-invoice'|'proforma'|'receipt'|'purchase-order'|'delivery-challan'|'estimate'|'bill'|'salary-slip';
export interface LineItem { id: string; description: string; quantity: number; rate: number; taxRate: number; }
export interface DocumentDraft { type: DocumentType; number: string; issueDate: string; dueDate: string; businessName: string; businessEmail: string; customerName: string; customerEmail: string; currency: string; items: LineItem[]; notes: string; terms: string; }
