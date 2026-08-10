import { useMemo, useRef } from 'react';
import { Download, Plus, Printer, Share2, Trash2 } from 'lucide-react';
import { DocumentPreview } from '../components/DocumentPreview';
import { Seo } from '../components/Seo';
import { useLocalDraft } from '../hooks/useLocalDraft';
import type { DocumentType, LineItem } from '../types';

const routeTypes: Record<string, DocumentType> = {
  'free-invoice-generator': 'invoice', 'free-quotation-generator': 'quotation',
  'gst-invoice-generator': 'gst-invoice', 'proforma-invoice-generator': 'proforma',
  'receipt-generator': 'receipt', 'salary-slip-generator': 'salary-slip',
  'purchase-order-generator': 'purchase-order', 'delivery-challan-generator': 'delivery-challan',
  'estimate-generator': 'estimate', 'bill-generator': 'bill',
};

export function GeneratorPage() {
  const slug = window.location.pathname.split('/').filter(Boolean).pop() || 'free-invoice-generator';
  const type = routeTypes[slug] || 'invoice';
  const [draft, setDraft] = useLocalDraft(type);
  const preview = useRef<HTMLDivElement>(null);
  const title = useMemo(() => type.split('-').map((part) => part[0]!.toUpperCase() + part.slice(1)).join(' '), [type]);
  const patch = (key: string, value: unknown) => setDraft((current) => ({ ...current, [key]: value }));
  const updateItem = (id: string, key: keyof LineItem, value: string | number) => setDraft((current) => ({ ...current, items: current.items.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  const share = () => window.open(`https://wa.me/?text=${encodeURIComponent(`Here is ${draft.number} from ${draft.businessName || 'InvoicePilot'}`)}`, '_blank', 'noopener');

  return <>
    <Seo title={`Free ${title} Generator Online | InvoicePilot`} description={`Create a professional ${title.toLowerCase()} online for free. No signup. Add items and tax, upload a logo, auto-save locally and download a clean PDF.`} path={`/${slug}`} />
    <main className="mx-auto max-w-[1480px] px-4 py-8">
      <div className="no-print mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-blue-700">Free · No signup · Private</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Free {title} Generator</h1><p className="mt-2 text-sm text-zinc-500">Everything is saved locally in this browser.</p></div>
        <div className="flex flex-wrap gap-2"><button className="btn-soft flex items-center gap-2" onClick={() => window.print()}><Printer size={17}/>Print</button><button className="btn-soft flex items-center gap-2" onClick={share}><Share2 size={17}/>WhatsApp</button><button className="btn-primary flex items-center gap-2" onClick={() => window.print()}><Download size={17}/>Save PDF</button></div>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[440px_1fr]">
        <section className="no-print rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between"><h2 className="font-bold">Document details</h2><span className="text-xs text-zinc-400">Auto-saved</span></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Document number"><input className="field mt-1" placeholder="INV-2026-001" value={draft.number} onChange={(event) => patch('number', event.target.value)}/></Field>
            <Field label="Issue date"><input type="date" className="field mt-1" value={draft.issueDate} onChange={(event) => patch('issueDate', event.target.value)}/></Field>
            <Field label="Business name"><input className="field mt-1" placeholder="e.g. Northwind Studio" value={draft.businessName} onChange={(event) => patch('businessName', event.target.value)}/></Field>
            <Field label="Business email"><input className="field mt-1" type="email" placeholder="hello@business.com" value={draft.businessEmail} onChange={(event) => patch('businessEmail', event.target.value)}/></Field>
            <Field label="Customer name"><input className="field mt-1" placeholder="Customer or company" value={draft.customerName} onChange={(event) => patch('customerName', event.target.value)}/></Field>
            <Field label="Customer email"><input className="field mt-1" type="email" placeholder="customer@example.com" value={draft.customerEmail} onChange={(event) => patch('customerEmail', event.target.value)}/></Field>
          </div>

          <div className="mt-7 flex items-center justify-between"><div><h3 className="font-bold">Line items</h3><p className="mt-1 text-xs text-zinc-400">Add products or services</p></div><button className="btn-soft flex items-center gap-1 text-sm" onClick={() => setDraft((current) => ({ ...current, items: [...current.items, { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0, taxRate: 0 }] }))}><Plus size={15}/>Add item</button></div>
          <div className="mt-4 space-y-3">{draft.items.map((item, index) => <div key={item.id} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold text-zinc-400">ITEM {index + 1}</span><button aria-label="Remove item" onClick={() => setDraft((current) => ({ ...current, items: current.items.filter((entry) => entry.id !== item.id) }))}><Trash2 size={16} className="text-zinc-400 hover:text-red-500"/></button></div><input aria-label="Item description" className="field" placeholder="Description of product or service" value={item.description} onChange={(event) => updateItem(item.id, 'description', event.target.value)}/><div className="mt-2 grid grid-cols-3 gap-2"><Field label="Quantity"><input aria-label="Quantity" className="field mt-1" type="number" min="0" placeholder="1" value={item.quantity || ''} onChange={(event) => updateItem(item.id, 'quantity', Number(event.target.value))}/></Field><Field label="Rate"><input aria-label="Rate" className="field mt-1" type="number" min="0" placeholder="0.00" value={item.rate || ''} onChange={(event) => updateItem(item.id, 'rate', Number(event.target.value))}/></Field><Field label="Tax %"><input aria-label="Tax percent" className="field mt-1" type="number" min="0" placeholder="0" value={item.taxRate || ''} onChange={(event) => updateItem(item.id, 'taxRate', Number(event.target.value))}/></Field></div></div>)}</div>
          <Field label="Notes"><textarea className="field mt-1 min-h-20" placeholder="Thank you for your business." value={draft.notes} onChange={(event) => patch('notes', event.target.value)}/></Field>
          <Field label="Payment terms"><textarea className="field mt-1 min-h-20" placeholder="Payment due within 15 days." value={draft.terms} onChange={(event) => patch('terms', event.target.value)}/></Field>
        </section>
        <div className="overflow-auto rounded-xl border border-zinc-200 bg-zinc-200/70 p-4 md:p-8 dark:border-zinc-800 dark:bg-zinc-800"><DocumentPreview ref={preview} draft={draft}/></div>
      </div>
    </main>
  </>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mt-4 block text-xs font-semibold text-zinc-600 dark:text-zinc-300">{label}{children}</label>;
}
