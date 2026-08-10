import { useEffect } from 'react';

declare global { interface Window { adsbygoogle?: unknown[] } }

export function AdBanner({ slot }: { slot?: string }) {
  const client = import.meta.env.VITE_ADSENSE_CLIENT;
  useEffect(() => {
    if (!client || !slot) return;
    if (!document.querySelector('script[data-invoicepilot-adsense]')) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.dataset.invoicepilotAdsense = 'true';
      document.head.appendChild(script);
    }
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* AdSense retries after load. */ }
  }, [client, slot]);

  if (!client || !slot) return null;
  return <div className="no-print mx-auto max-w-7xl px-5 py-3" aria-label="Advertisement"><ins className="adsbygoogle block min-h-[90px]" data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></div>;
}
