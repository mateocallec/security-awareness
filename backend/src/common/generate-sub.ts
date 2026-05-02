import * as crypto from 'crypto';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function generateSub(length: number): string {
  const bytes = crypto.randomBytes(length);
  return Array.from(bytes)
    .map((b) => CHARS[b % CHARS.length])
    .join('');
}
