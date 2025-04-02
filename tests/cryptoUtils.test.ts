import { describe, it, expect, beforeAll } from 'vitest';
import {
  encode,
  decode,
  canonicalize,
  generateSignature,
} from '../src/utils/encryption';

const ENCRYPTION_ALGORITHM = 'base64';

describe('cryptoUtils', () => {
  const sampleObject = {
    name: 'Bob',
    age: 32,
    address: {
      city: 'Paris',
      zip: 75010,
    },
  };

  const reorderedObject = {
    age: 32,
    name: 'Bob',
    address: {
      zip: 75010,
      city: 'Paris',
    },
  };

  beforeAll(() => {
    if (!process.env.HMAC_SECRET) {
      process.env.HMAC_SECRET = 'test_secret';
    }
  });

  it('encodes and decodes JSON correctly', () => {
    const encoded = encode(sampleObject, ENCRYPTION_ALGORITHM);
    const decoded = decode(encoded, ENCRYPTION_ALGORITHM);

    expect(decoded).toEqual(sampleObject);
  });

  it('decode returns original string if not valid JSON', () => {
    const result = decode('not-valid', ENCRYPTION_ALGORITHM);
    expect(result).toBe('not-valid');
  });

  it('canonicalize returns keys sorted alphabetically', () => {
    const result = canonicalize(reorderedObject);
    expect(Object.keys(result)).toEqual(['address', 'age', 'name']);
    expect(Object.keys(result.address)).toEqual(['city', 'zip']);
  });

  it('generateSignature returns same result regardless of key order', () => {
    const sig1 = generateSignature(sampleObject);
    const sig2 = generateSignature(reorderedObject);

    expect(sig1).toBe(sig2);
  });

  it('generateSignature returns different result for different input', () => {
    const sig1 = generateSignature(sampleObject);
    const sig2 = generateSignature({ ...sampleObject, age: 31 });

    expect(sig1).not.toBe(sig2);
  });
});
