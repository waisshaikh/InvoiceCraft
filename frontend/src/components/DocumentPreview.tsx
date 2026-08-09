import { forwardRef, useEffect, useRef, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import type { DocumentDraft } from '../types';
import { money, totals } from '../lib/document';

export const DocumentPreview = forwardRef<HTMLDivElement, { draft: DocumentDraft }>(
  ({ draft }, ref) => {
    const totalsValue = totals(draft);
    const inputRef = useRef<HTMLInputElement>(null);
    const storageKey = `invoicepilot-logo-${draft.type}`;
    const [logo, setLogo] = useState(() => localStorage.getItem(storageKey) || '');
    const [logoError, setLogoError] = useState('');

    useEffect(() => {
      setLogo(localStorage.getItem(storageKey) || '');
    }, [storageKey]);

    const selectLogo = (file?: File) => {
      setLogoError('');
      if (!file) return;
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        setLogoError('Use a PNG, JPG or WebP image.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setLogoError('Logo must be smaller than 2 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const value = String(reader.result || '');
        localStorage.setItem(storageKey, value);
        setLogo(value);
      };
      reader.readAsDataURL(file);
    };

    const removeLogo = () => {
      localStorage.removeItem(storageKey);
      setLogo('');
      if (inputRef.current) inputRef.current.value = '';
    };

    return (
      <div
        ref={ref}
        className="print-sheet relative mx-auto min-h-[760px] max-w-[760px] bg-white p-8 text-slate-900 shadow-lg shadow-zinc-900/10 md:p-12"
      >
        <header className="grid grid-cols-[1fr_auto] gap-8 border-b-2 border-slate-900 pb-8">
          <div>
            <div className="group relative mb-5 flex h-20 w-40 items-center justify-center overflow-hidden rounded-md border border-dashed border-slate-300 bg-slate-50">
              {logo ? (
                <img src={logo} alt={`${draft.businessName} logo`} className="h-full w-full object-contain p-2" />
              ) : (
                <div className="text-center text-slate-400">
                  <ImagePlus className="mx-auto" size={22} />
                  <span className="mt-1 block text-[11px] font-semibold">Add your logo</span>
                </div>
              )}
              <button
                type="button"
                className="no-print absolute inset-0 bg-slate-900/75 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                onClick={() => inputRef.current?.click()}
              >
                {logo ? 'Replace logo' : 'Upload logo'}
              </button>
              <input
                ref={inputRef}
                className="hidden"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => selectLogo(event.target.files?.[0])}
              />
            </div>
            {logo && (
              <button type="button" onClick={removeLogo} className="no-print mb-3 flex items-center gap-1 text-xs text-red-600">
                <Trash2 size={12} /> Remove logo
              </button>
            )}
            {logoError && <p className="no-print mb-2 text-xs text-red-600">{logoError}</p>}
            <h2 className="text-xl font-bold tracking-tight">{draft.businessName}</h2>
            <p className="mt-1 text-sm text-slate-500">{draft.businessEmail}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">
              {draft.type.replace('-', ' ')}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{draft.number}</h1>
            <dl className="mt-4 grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-sm">
              <dt className="text-slate-500">Issue date</dt><dd className="font-medium">{draft.issueDate}</dd>
              {draft.dueDate && <><dt className="text-slate-500">Due date</dt><dd className="font-medium">{draft.dueDate}</dd></>}
            </dl>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-8 py-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Bill to</p>
            <p className="mt-2 font-bold">{draft.customerName || 'Customer name'}</p>
            <p className="mt-1 text-sm text-slate-500">{draft.customerEmail}</p>
          </div>
        </section>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-y-2 border-slate-900 text-left text-[11px] uppercase tracking-wider text-slate-700">
              <th className="px-3 py-3">Description</th><th className="px-3">Qty</th>
              <th className="px-3">Rate</th><th className="px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {draft.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-200">
                <td className="px-3 py-4 font-medium">{item.description || 'Item'}</td>
                <td className="px-3">{item.quantity}</td>
                <td className="px-3">{money(item.rate, draft.currency)}</td>
                <td className="px-3 text-right font-semibold">{money(item.quantity * item.rate, draft.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto mt-7 w-full max-w-[280px] space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>{money(totalsValue.subtotal, draft.currency)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tax</span><span>{money(totalsValue.tax, draft.currency)}</span></div>
          <div className="flex justify-between border-t-2 border-slate-900 pt-3 text-lg font-bold"><span>Total</span><span>{money(totalsValue.total, draft.currency)}</span></div>
        </div>

        <footer className="mt-16 grid gap-8 border-t border-slate-200 pt-7 text-sm md:grid-cols-2">
          <div><p className="font-bold">Notes</p><p className="mt-2 leading-6 text-slate-500">{draft.notes}</p></div>
          <div><p className="font-bold">Payment terms</p><p className="mt-2 leading-6 text-slate-500">{draft.terms}</p></div>
        </footer>
      </div>
    );
  },
);

DocumentPreview.displayName = 'DocumentPreview';
