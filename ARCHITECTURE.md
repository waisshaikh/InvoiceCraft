# InvoicePilot architecture

## 1. Architecture

The repository is an npm workspace. The React SPA owns presentation, form validation, local drafts and PDF/print exports. The Express API owns authentication, authorization, persistence, uploads and analytics. REST resources use `/api/v1`; controllers contain HTTP orchestration, services contain business logic, Mongoose models own persistence, and Zod schemas validate boundaries.

## 2. Folder structure

```text
InvoicePilot/
├── Backend/src/{config,controllers,middleware,models,routes,schemas,services,utils}
├── frontend/src/{api,components,features,hooks,layouts,lib,pages,store,types}
├── ARCHITECTURE.md
└── package.json
```

## 3. Database schema

- User: name, email (unique), password hash, role, preferences.
- BusinessProfile: owner, identity, GST, address, bank details, Cloudinary logo/signature and UPI.
- Customer: owner, name, contact, billing/shipping address, GSTIN.
- Product: owner, name, SKU, unit, price, tax rate and HSN/SAC.
- Document: owner, type, number, parties, line items, tax totals, status, dates, notes, template and audit flags. Dedicated Invoice, Quotation, Receipt and PurchaseOrder model exports use discriminators.

Every tenant-owned query is scoped by `owner` and indexed for search/date access.

## 4. Backend API

`POST /auth/register`, `POST /auth/login`, `GET /auth/me`; CRUD at `/customers`, `/products`, `/documents`; `/documents/:id/duplicate`, `/documents/:id/archive`; `GET/PUT /business-profile`; `GET /analytics/summary`. Bearer JWT is required except health/auth. Validation, rate limiting, Helmet, CORS, logging and centralized errors are applied globally.

## 5. Frontend pages

Public SEO routes cover invoice, quotation, GST invoice, proforma, receipt, salary slip, purchase order, delivery challan, estimate, bill and business-card generators. Authenticated routes include Dashboard, Invoices, Quotations, Customers, Products, Analytics, Templates and Settings.

## 6. Reusable components

App shell, sidebar, theme toggle, stat cards, document editor, line-item table, totals, status badges, empty/loading/error states and accessible form controls are shared across modules.

## 7. Authentication

Passwords use bcrypt. JWTs expire server-side by configuration and the client stores the session in persisted Zustand state. Protected API routes always derive ownership from the verified token.

## 8. PDF generation

The browser renders a print-safe preview and exports it through `html2canvas` + `jsPDF`; print uses the same A4 layout. `@react-pdf/renderer` is installed for future server-neutral template rendering.

## 9. Deployment

- Frontend: import the repository in Vercel, root `frontend`, build `npm run build`, output `dist`, and set `VITE_API_URL`.
- Backend: create a Render web service with root `Backend`, build `npm install && npm run build`, start `npm start`; set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` and Cloudinary variables.
- MongoDB Atlas: create a least-privilege database user and permit only deployment egress where possible.

## 10. Testing checklist

- Register/login/expired and malformed JWT; tenant isolation; validation and rate limits.
- CRUD, search, pagination, duplicate/archive/delete, totals and GST calculations.
- Local draft recovery and cloud sync conflict behavior.
- PDF A4 pagination, print, email/WhatsApp URLs and each template.
- Keyboard navigation, labels, focus, contrast, responsive breakpoints and reduced motion.
- Meta/canonical/OG/JSON-LD, sitemap/robots, lazy chunks and production Lighthouse.
