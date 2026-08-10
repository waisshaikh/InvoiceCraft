import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  const server = app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`InvoicePilot API listening on port ${env.PORT}`);
  });

  connectDatabase()
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed; API remains available', error));

  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};
void start();
