import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { useAppStore } from './store/useAppStore';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const GeneratorPage = lazy(() => import('./pages/GeneratorPage').then((module) => ({ default: module.GeneratorPage })));
const InfoPage = lazy(() => import('./pages/InfoPage').then((module) => ({ default: module.InfoPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

const generators = ['free-invoice-generator', 'free-quotation-generator', 'gst-invoice-generator', 'proforma-invoice-generator', 'receipt-generator', 'salary-slip-generator', 'purchase-order-generator', 'delivery-challan-generator', 'estimate-generator', 'bill-generator'];

export default function App() {
  const theme = useAppStore((state) => state.theme);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <Suspense fallback={<div className="grid min-h-screen place-items-center text-zinc-500">Loading InvoicePilot…</div>}>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        {generators.map((slug) => <Route key={slug} path={slug} element={<GeneratorPage />} />)}
        {['privacy-policy', 'terms', 'about', 'contact'].map((path) => <Route key={path} path={path} element={<InfoPage />} />)}
        <Route path="business-card-generator" element={<Navigate to="/free-invoice-generator" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>;
}
