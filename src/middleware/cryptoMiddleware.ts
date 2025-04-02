import { Request, Response, NextFunction } from 'express';

// Validate JSON input
export const validateJsonInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).json({ error: 'Invalid JSON payload' });
  } else {
    next();
  }
};

// Validation for /verify endpoint
export const validateVerifyPayload = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body.signature || !req.body.data) {
    res.status(400).json({ error: 'Invalid JSON schema' });
  } else {
    next();
  }
};
