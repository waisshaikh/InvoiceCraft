import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { register, login, me } from '../controllers/authController.js';
import { resourceController } from '../controllers/resourceController.js';
import { duplicate, archive } from '../controllers/documentController.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { summary } from '../controllers/analyticsController.js';
import { Customer } from '../models/Customer.js';
import { Product } from '../models/Product.js';
import { Document } from '../models/Document.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { customerSchema, documentSchema, loginSchema, productSchema, registerSchema } from '../schemas/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false });
router.post('/auth/register', authLimiter, validate(registerSchema), asyncHandler(register));
router.post('/auth/login', authLimiter, validate(loginSchema), asyncHandler(login));
router.get('/auth/me', authenticate, asyncHandler(me));
router.use(authenticate);

const mountCrud = (path: string, controller: ReturnType<typeof resourceController>, schema: any) => {
  router.route(path).get(asyncHandler(controller.list)).post(validate(schema), asyncHandler(controller.create));
  router.route(`${path}/:id`).get(asyncHandler(controller.get)).put(validate(schema), asyncHandler(controller.update)).delete(asyncHandler(controller.remove));
};
mountCrud('/customers', resourceController(Customer), customerSchema);
mountCrud('/products', resourceController(Product), productSchema);
const documents = resourceController(Document);
mountCrud('/documents', documents, documentSchema);
router.post('/documents/:id/duplicate', asyncHandler(duplicate));
router.patch('/documents/:id/archive', asyncHandler(archive));
router.route('/business-profile').get(asyncHandler(getProfile)).put(asyncHandler(updateProfile));
router.get('/analytics/summary', asyncHandler(summary));
