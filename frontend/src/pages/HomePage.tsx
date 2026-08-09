import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileCheck2, LockKeyhole, Timer } from 'lucide-react';
import { Seo } from '../components/Seo';

const tools = [
  ['Invoice', 'Create itemised invoices with tax and payment terms.', '/free-invoice-generator'],
  ['Quotation', 'Send clear prices before starting the work.', '/free-quotation-generator'],
  ['GST Invoice', 'Generate compliant invoices with GST calculations.', '/gst-invoice-generator'],
  ['Proforma Invoice', 'Share a preliminary bill before fulfilment.', '/proforma-invoice-generator'],
  ['Purchase Order', 'Create structured purchase requests for vendors.', '/purchase-order-generator'],
  ['Receipt', 'Record completed payments with a clean receipt.', '/receipt-generator'],
  ['Delivery Challan', 'Document goods dispatched without an invoice.', '/delivery-challan-generator'],
  ['Estimate', 'Give customers a simple project cost estimate.', '/estimate-generator'],
];

export function HomePage() {
  return <>
    <Seo title="InvoicePilot — Business documents made simple" description="Create invoices, quotations, GST invoices, receipts and purchase orders online." />
    <main>
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#15181d]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_480px] lg:py-24">
          <div className="self-center">
            <p className="mb-4 text-sm font-semibold text-blue-700 dark:text-blue-400">Simple document software for small businesses</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-.035em] text-slate-900 md:text-6xl dark:text-white">Create business documents without the spreadsheet.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-400">Build an invoice, quotation or receipt in minutes. Your work is saved as you type, and every document is ready to print or share.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary flex items-center gap-2" to="/free-invoice-generator">Create an invoice <ArrowRight size={16}/></Link>
              <Link className="btn-soft" to="/free-quotation-generator">Create a quotation</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
              {['No credit card', 'Works without an account', 'Drafts saved locally'].map(item => <span key={item} className="flex items-center gap-2"><Check size={15} className="text-emerald-600"/>{item}</span>)}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-[#f4f5f7] p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="rounded-lg border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-700 dark:bg-[#1b1e24]">
              <div className="flex items-start justify-between border-b border-zinc-200 pb-6 dark:border-zinc-700"><div><div className="mb-4 h-8 w-8 rounded bg-blue-600"/><p className="font-bold">Northwind Studio</p><p className="text-xs text-zinc-500">hello@northwind.co</p></div><div className="text-right"><p className="text-xs font-bold uppercase tracking-wider text-blue-600">Invoice</p><p className="mt-1 text-xl font-bold">INV-1048</p><p className="mt-1 text-xs text-zinc-500">9 August 2026</p></div></div>
              <p className="mt-6 text-xs font-bold uppercase text-zinc-400">Bill to</p><p className="mt-1 text-sm font-semibold">Acme Ventures</p>
              <div className="mt-7 space-y-3 text-sm">{[['Brand identity','₹24,000'],['Website design','₹18,500'],['GST · 18%','₹7,650']].map(([label,value])=><div key={label} className="flex justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800"><span className="text-zinc-600 dark:text-zinc-400">{label}</span><span className="font-medium">{value}</span></div>)}</div>
              <div className="mt-5 flex justify-between border-t border-zinc-300 pt-4 text-lg font-bold dark:border-zinc-600"><span>Total</span><span>₹50,150</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl"><p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Document tools</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Start with what you need</h2><p className="mt-3 text-zinc-500">Each generator is free to use and follows the same straightforward workflow.</p></div>
        <div className="mt-8 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800">{tools.map(([name,description,path])=><Link to={path} key={path} className="group border-b border-r border-zinc-200 bg-white p-5 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#171a20] dark:hover:bg-zinc-800"><h3 className="font-semibold">{name}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-zinc-500">{description}</p><span className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Open tool <ArrowRight size={14} className="transition group-hover:translate-x-1"/></span></Link>)}</div>
      </section>

      <section className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#15181d]"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3">{[[Timer,'Quick to complete','A focused form, live totals and sensible defaults.'],[LockKeyhole,'Private by default','Use local drafts without creating an account.'],[FileCheck2,'Ready to send','Clean A4 layouts for printing, PDF and sharing.']].map(([Icon,title,text]:any)=><div key={title} className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-zinc-200 bg-zinc-50 text-blue-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-400"><Icon size={19}/></div><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p></div></div>)}</div></section>
    </main>
  </>;
}
