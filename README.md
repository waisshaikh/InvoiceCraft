# InvoicePilot

Production-oriented MERN SaaS for creating invoices, quotations, receipts and other business documents.

## First look

1. Copy `Backend/.env.example` to `Backend/.env`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Run `npm install` from this directory.
4. Run `npm run dev` and open `http://localhost:5173`.

The API runs on `http://localhost:5000`. Generators work locally without an account; authenticated users can sync documents to MongoDB.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for modules, API routes, schemas, deployment, and testing.
