import { Link, useLocation } from 'react-router-dom';
import { Seo } from '../components/Seo';

const pages = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How InvoicePilot handles local document data, advertising cookies and privacy.',
    body: <>
      <p>InvoicePilot is a local-first document generator. Business details, customer details, line items and uploaded logos entered in a generator are stored in your browser's local storage and are not uploaded by the generator.</p>
      <h2>Local storage</h2><p>Local storage keeps drafts on the same browser and device. You can remove them by clearing this site's browser data. Anyone with access to your browser profile may be able to view locally saved drafts.</p>
      <h2>Google advertising cookies</h2><p>We may use Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on a user's previous visits to this website or other websites. Google's use of advertising cookies enables Google and its partners to serve ads based on visits to this site and other sites on the Internet.</p>
      <p>Users may opt out of personalized advertising through <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>. Information about choices for other vendors is available at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">YourAdChoices</a>.</p>
      <h2>Consent</h2><p>Where required, a consent message may ask permission before advertising cookies or personalized advertising are used. Consent choices can be changed through the privacy controls provided with that message.</p>
      <h2>Technical information</h2><p>Hosting and advertising providers may process standard technical information such as IP address, browser, device type, referring page and request timestamps for delivery, security, fraud prevention and aggregate measurement.</p>
      <h2>Contact</h2><p>For privacy questions, use our <Link to="/contact">contact page</Link>.</p>
    </>,
  },
  '/terms': {
    title: 'Terms of Use', description: 'Terms for using the free InvoicePilot document generators.',
    body: <><p>By using InvoicePilot, you agree to these terms. The tools are provided free of charge to help prepare business documents.</p><h2>Your responsibility</h2><p>You must review every document, calculation, tax treatment and legal requirement before using or sending it. InvoicePilot does not provide accounting, tax or legal advice.</p><h2>Acceptable use</h2><p>Do not use the service for unlawful, deceptive or abusive activity, or attempt to disrupt the website or its advertising systems.</p><h2>No warranty</h2><p>The service is provided as-is without guarantees of uninterrupted availability, fitness for a particular purpose or error-free calculations. To the extent permitted by law, InvoicePilot is not liable for losses arising from reliance on generated documents.</p><h2>Changes</h2><p>We may improve the service or update these terms. Continued use after an update constitutes acceptance of the revised terms.</p></>,
  },
  '/about': {
    title: 'About InvoicePilot', description: 'Why InvoicePilot provides free and private business document tools.',
    body: <><p>InvoicePilot helps freelancers, shops, agencies and small businesses create everyday documents without complicated accounting software.</p><h2>Free and practical</h2><p>Create invoices, quotations, GST invoices, receipts, purchase orders, estimates and delivery challans without an account or subscription.</p><h2>Local first</h2><p>Drafts remain in your browser so you retain control of business and customer information.</p><h2>Built for real work</h2><p>Documents use clean A4 layouts, automatic totals and familiar fields. Our goal is a dependable utility that stays out of the way.</p></>,
  },
  '/contact': {
    title: 'Contact InvoicePilot', description: 'Contact InvoicePilot with feedback, questions or privacy requests.',
    body: <><p>We welcome product feedback, bug reports and privacy questions.</p><h2>Email</h2><p>Email <a href="mailto:hello@invoicepilotapp.com">hello@invoicepilotapp.com</a>. Include the generator name, browser and a short description when reporting a problem.</p><h2>Protect your information</h2><p>Do not email invoices, customer records, bank details or other sensitive business information. We do not need document data to investigate most issues.</p></>,
  },
} as const;

export function InfoPage() {
  const path = useLocation().pathname as keyof typeof pages;
  const page = pages[path] || pages['/about'];
  return <><Seo title={`${page.title} | InvoicePilot`} description={page.description} path={path}/><main className="mx-auto max-w-3xl px-5 py-16"><p className="text-sm font-semibold text-blue-700">Free business tools</p><h1 className="mt-2 text-4xl font-bold tracking-tight">{page.title}</h1><p className="mt-3 text-sm text-zinc-400">Last updated: 10 August 2026</p><article className="info-content mt-10">{page.body}</article></main></>;
}
