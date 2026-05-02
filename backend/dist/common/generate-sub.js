"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSub = generateSub;
const crypto = require("crypto");
const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
function generateSub(length) {
    const bytes = crypto.randomBytes(length);
    return Array.from(bytes)
        .map((b) => CHARS[b % CHARS.length])
        .join('');
}
//# sourceMappingURL=generate-sub.js.map