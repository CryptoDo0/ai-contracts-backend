const crypto = require('crypto');

export default function generateRandomString(length) : string {
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}