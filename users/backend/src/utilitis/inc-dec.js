const crypto = require('crypto');

// Secret keys and encryption method
const encryption_secret_key = process.env.encryption_secret_key;
const encryption_secret_iv = process.env.encryption_secret_iv;
const encryption_method = process.env.encryption_method;

// Generate secret hash with crypto to use for encryption
const encryptionKey = crypto
  .createHash('sha512')
  .update(encryption_secret_key)
  .digest('hex')
  .substring(0, 32);

const encryptionIV = crypto
  .createHash('sha512')
  .update(encryption_secret_iv)
  .digest('hex')
  .substring(0, 16);

// Encrypt data
function encrypt(data) {
  const cipher = crypto.createCipheriv(encryption_method, encryptionKey, encryptionIV);
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64'); 
}

// Decrypt data
function decrypt(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(encryption_method, encryptionKey, encryptionIV);
  const decrypted =
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
  return decrypted; 
}

module.exports = { encrypt, decrypt };
