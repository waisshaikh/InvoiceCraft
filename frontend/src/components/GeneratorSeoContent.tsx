import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, LockKeyhole, Printer, Save } from 'lucide-react';

const names: Record<string, string> = {
  '/free-invoice-generator': 'invoice', '/free-quotation-generator': 'quotation',
  '/gst-invoice-generator': 'GST invoice', '/proforma-invoice-generator': 'proforma invoice',
  '/receipt-generator': 'receipt', '/salary-slip-generator': 'salary slip',
  '/purchase-order-generator': 'purchase order', '/delivery-challan-generator': 'delivery challan',
  '/estimate-generator': 'estimate', '/bill-generator': 'bill',
};

export function GeneratorSeoContent() {
  const path = useLocation().pathname;
  const name = names[path];
  if (!name) return null;
  const label = name[0]!.toUpperCase() + name.slice(1);
  return <section className="no-print mx-auto max-w-5xl px-5 py-16">
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <article>
        <h2 className="text-3xl font-bold tracking-tight">Free online {name} generator</h2>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">Create a professional {name} directly in your browser. Add your business details, customer information, items, rates and taxes, then print or save the finished document as a PDF. InvoicePilot does not require registration and keeps your draft on your own device.</p>
        <h3 className="mt-8 text-xl font-bold">How to create a {name}</h3>
        <ol className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400"><li>1. Enter your business and customer information.</li><li>2. Add products or services with quantity, rate and applicable tax.</li><li>3. Review the live preview and upload your business logo.</li><li>4. Select Save PDF or Print when the document is ready.</li></ol>
        <h3 className="mt-8 text-xl font-bold">Frequently asked questions</h3>
        <div className="mt-4 space-y-4"><details className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><summary className="cursor-pointer font-semibold">Is this {name} generator free?</summary><p className="mt-3 text-sm leading-6 text-zinc-500">Yes. It is free to use and does not require an account or payment details.</p></details><details className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><summary className="cursor-pointer font-semibold">Where is my information stored?</summary><p className="mt-3 text-sm leading-6 text-zinc-500">Your draft and logo are stored locally in your browser. They are not uploaded to our server by the generator.</p></details><details className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><summary className="cursor-pointer font-semibold">Can I save it as a PDF?</summary><p className="mt-3 text-sm leading-6 text-zinc-500">Yes. Use Save PDF and choose “Save as PDF” in your browser’s print dialog.</p></details></div>
      </article>
      <aside><h3 className="font-bold">Why use InvoicePilot?</h3><ul className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">{[[CheckCircle2,`${label} ready in minutes`],[LockKeyhole,'Local and private by default'],[Save,'Automatic draft saving'],[Printer,'Clean A4 print layout']].map(([Icon,text]: any)=><li className="flex items-center gap-3" key={text}><Icon size={18} className="text-blue-600"/>{text}</li>)}</ul><div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800"><p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Other free tools</p><div className="mt-3 flex flex-col gap-2 text-sm font-medium text-blue-700 dark:text-blue-400"><Link to="/free-invoice-generator">Invoice generator</Link><Link to="/free-quotation-generator">Quotation generator</Link><Link to="/gst-invoice-generator">GST invoice generator</Link><Link to="/receipt-generator">Receipt generator</Link></div></div></aside>
    </div>
  </section>;
}
