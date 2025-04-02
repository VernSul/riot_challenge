import { Router } from 'express';
import {
  encryptHandler,
  decryptHandler,
  signHandler,
  verifyHandler,
} from '../controllers/cryptoController';

import { validateVerifyPayload } from '../middleware/cryptoMiddleware';

const router = Router();

// Encrypt JSON payload
router.post('/encrypt', encryptHandler);

// Decrypt encoded JSON
router.post('/decrypt', decryptHandler);

// Sign a JSON payload
router.post('/sign', signHandler);

// Verify signature of a JSON payload
router.post('/verify', validateVerifyPayload, verifyHandler);

export default router;
