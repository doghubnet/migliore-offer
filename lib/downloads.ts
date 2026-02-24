import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

type DownloadPayload = {
  productId: string;
  orderId?: string;
  sessionId?: string;
  jti: string;
};

const consumed = new Set<string>();

export function createDownloadToken({ productId, orderId, sessionId }: { productId: string; orderId?: string; sessionId?: string }) {
  const secret = process.env.JWT_DOWNLOAD_SECRET;
  if (!secret) throw new Error('JWT_DOWNLOAD_SECRET missing');

  const payload: DownloadPayload = {
    productId,
    orderId,
    sessionId,
    jti: crypto.randomUUID()
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyAndConsumeToken(token: string) {
  const secret = process.env.JWT_DOWNLOAD_SECRET;
  if (!secret) throw new Error('JWT_DOWNLOAD_SECRET missing');

  const payload = jwt.verify(token, secret) as DownloadPayload;
  if (consumed.has(payload.jti)) {
    throw new Error('Token already used');
  }

  // Demo-only in-memory store. Replace with persistent DB in production.
  consumed.add(payload.jti);
  return payload;
}
