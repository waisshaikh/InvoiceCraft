import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  try {
    await connectDatabase();
    const server = app.listen(env.PORT, () => console.log(`InvoicePilot API ready on http://localhost:${env.PORT}`));
    const shutdown = () => server.close(() => process.exit(0));
    process.on('SIGTERM', shutdown); process.on('SIGINT', shutdown);
  } catch (error) { console.error('API startup failed', error); process.exit(1); }
};
void start();
