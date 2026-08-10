# InvoicePilot

Production-oriented MERN SaaS for creating invoices, quotations, receipts and other business documents.

## First look

1. Copy `Backend/.env.example` to `Backend/.env`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Run `npm install` from this directory.
4. Run `npm run dev` and open `http://localhost:5173`.

The API runs on `http://localhost:5000`. Generators work locally without an account; authenticated users can sync documents to MongoDB.

For production, configure the backend with `CLIENT_URL=https://invoicepilotapp.com,https://www.invoicepilotapp.com` and the frontend with `VITE_API_URL=https://api.invoicepilotapp.com/api/v1`. Keep `http://localhost:5173` in the backend allowlist only when local frontend access is required.

## Google AdSense

The public frontend is configured for optional responsive AdSense placements. Set these variables in `frontend/.env` and in Vercel:

```env
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
VITE_ADSENSE_TOP_SLOT=1234567890
```

Ads remain disabled when either value is empty. Before enabling personalized ads, configure the consent flow required for the countries you serve and replace the example contact email/domain in the legal pages. Add an `ads.txt` file only after Google provides the exact publisher line for the approved account.

The production canonical domain is `https://invoicepilotapp.com`. Submit `https://invoicepilotapp.com/sitemap.xml` in Google Search Console after deployment.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for modules, API routes, schemas, deployment, and testing.
