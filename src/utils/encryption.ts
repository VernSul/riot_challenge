import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const HMAC_SECRET = process.env.HMAC_SECRET;

export const encode = (input: any, algorithm: BufferEncoding): string => {
  const json = JSON.stringify(input);
  return Buffer.from(json).toString(algorithm);
};

export const decode = (input: string, algorithm: BufferEncoding): any => {
  try {
    const decoded = Buffer.from(input, algorithm).toString();
    return JSON.parse(decoded);
  } catch {
    return input;
  }
};

export const canonicalize = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(canonicalize);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = canonicalize(obj[key]);
        return result;
      }, {});
  }
  return obj;
};

export const generateSignature = (data: any): string => {
  const canonicalData = canonicalize(data);
  if (!HMAC_SECRET) {
    throw new Error('HMAC_SECRET is not defined');
  }
  const hash = crypto.createHmac('sha256', HMAC_SECRET);
  hash.update(JSON.stringify(canonicalData));
  return hash.digest('hex');
};
