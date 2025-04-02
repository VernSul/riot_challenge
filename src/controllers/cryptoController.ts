import { Request, Response, NextFunction } from 'express';
import { encode, decode, generateSignature } from '../utils/encryption';
import { HttpError } from '../middleware/errorHandler';

const ENCRYPTION_ALGORITHM = 'base64';

// Controller: /encrypt
export const encryptHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    const encrypted: Record<string, string> = {};
    Object.entries(body).forEach(([key, value]) => {
      encrypted[key] = encode(value, ENCRYPTION_ALGORITHM);
    });

    res.status(200).json(encrypted);
  } catch (err) {
    next(err);
  }
};

// Controller: /decrypt
export const decryptHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const decrypted: Record<string, any> = {};
    Object.entries(body).forEach(([key, value]) => {
      decrypted[key] =
        typeof value === 'string' ? decode(value, ENCRYPTION_ALGORITHM) : value;
    });

    res.status(200).json(decrypted);
  } catch (err) {
    next(err);
  }
};

// Controller: /sign
export const signHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const signature = generateSignature(payload);
    res.status(200).json({ signature });
  } catch (err) {
    next(err);
  }
};

// Controller: /verify
export const verifyHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { signature, data } = req.body;
    const expectedSignature = generateSignature(data);

    if (signature === expectedSignature) {
      res.status(204).send();
    } else {
      throw new HttpError('Invalid signature', 400);
    }
  } catch (err) {
    next(err);
  }
};
