import { Link, useLocation } from 'react-router-dom';
import { Seo } from '../components/Seo';

const content = {
  '/privacy-policy': {
    title: 'Privacy Policy', description: 'How InvoicePilot handles local document data, analytics, advertising and privacy.',
    body: <><p>InvoicePilot is designed as a local-first document generator. Information entered into a generator, including business details, customer details, line items and uploaded logos, is stored in your browser’s local storage. This generator data is not sent to our server.</p><h2>Local storage</h2><p>Local storage allows drafts to remain available on the same browser and device. You can remove this information by clearing your browser’s site data. Anyone with access to your browser profile may be able to view locally saved drafts.</p><h2>Advertising and cookies</h2><p>We may use Google AdSense to display advertisements. Google and its partners may use cookies or similar technologies to serve and measure ads, prevent fraud, and personalize advertising where permitted. Your choices may depend on your region and consent settings.</p><h2>Technical information</h2><p>Our hosting and advertising providers may process standard technical data such as IP address, device type, browser, referring page and request timestamps for security, delivery and aggregate measurement.</p><h2>Third-party links</h2><p>InvoicePilot may link to external services. Their privacy practices are governed by their own policies.</p><h2>Your choices</h2><p>You may block cookies, clear site data, disable personalized advertising through Google’s ad settings, or stop using the service. Blocking storage can prevent draft autosave from working.</p><h2>Contact</h2><p>For privacy questions, use our <Link to="/contact">contact page</Link>.</p></>,
  },
  '/terms': {
    title: 'Terms of Use', description: 'Terms for using the free InvoicePilot business document generators.',
    body: <><p>By using InvoicePilot, you agree to these terms. The tools are provided free of charge to help prepare business documents.</p><h2>Your responsibility</h2><p>You are responsible for reviewing every document, calculation, tax treatment and legal requirement before using or sending it. InvoicePilot does not provide accounting, tax or legal advice.</p><h2>Acceptable use</h2><p>Do not use the service for unlawful, deceptive or abusive activity, or attempt to disrupt the website or its advertising systems.</p><h2>No warranty</h2><p>The service is provided “as is” without guarantees of uninterrupted availability, fitness for a particular purpose or error-free calculations. To the extent permitted by law, InvoicePilot is not liable for losses arising from reliance on generated documents.</p><h2>Changes</h2><p>We may improve the service or update these terms. Continued use after an update constitutes acceptance of the revised terms.</p></>,
  },
  '/about': {
    title: 'About InvoicePilot', description: 'Learn why InvoicePilot provides free, private and practical business document tools.',
    body: <><p>InvoicePilot helps freelancers, shops, agencies and small businesses create everyday documents without complicated accounting software.</p><h2>Free and practical</h2><p>Our generators focus on the document you need right now: invoices, quotations, GST invoices, receipts, purchase orders, estimates and delivery challans.</p><h2>Local first</h2><p>You can use the core generators without an account. Drafts remain in your browser so you can work quickly while retaining control of business and customer information.</p><h2>Built for real work</h2><p>Documents use clean A4 layouts, automatic totals and familiar fields. The goal is a dependable utility that stays out of the way.</p></>,
  },
  '/contact': {
    title: 'Contact InvoicePilot', description: 'Contact InvoicePilot with feedback, questions or privacy requests.',
    body: <><p>We welcome product feedback, bug reports and privacy questions.</p><h2>Email</h2><p>Email us at <a href="mailto:hello@invoicepilot.app">hello@invoicepilot.app</a>. Include the generator name, browser and a short description when reporting a problem.</p><h2>Important</h2><p>Do not email invoices, customer records, bank details or other sensitive business information. We do not need document data to investigate most issues.</p></>,
  },
} as const;

export function InfoPage() {
  const path = useLocation().pathname as keyof typeof content;
  const page = content[path] || content['/about'];
  return <><Seo title={`${page.title} | InvoicePilot`} description={page.description} path={path}/><main className="mx-auto max-w-3xl px-5 py-16"><p className="text-sm font-semibold text-blue-700">InvoicePilot</p><h1 className="mt-2 text-4xl font-bold tracking-tight">{page.title}</h1><p className="mt-3 text-sm text-zinc-400">Last updated: 10 August 2026</p><article className="info-content mt-10">{page.body}</article></main></>;
}
