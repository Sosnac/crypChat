import forge from 'node-forge';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';

const PRIVATE_KEY_ALIAS = 'crypchat_private_key';

export const CryptoEngine = {
  /**
   * Generates a new RSA-2048 Key Pair
   * Stores Private Key in SecureStore and returns the Public Key
   */
  async generateIdentity() {
    return new Promise((resolve, reject) => {
      forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 }, async (err, keypair) => {
        if (err) return reject(err);

        const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
        const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

        // Store private key safely in the device's Secure Enclave/Keystore
        await SecureStore.setItemAsync(PRIVATE_KEY_ALIAS, privateKeyPem);

        console.log("🛡️ Identity Generated and Private Key secured.");
        resolve(publicKeyPem); // Return Public Key to share with server/peers
      });
    });
  },

  /**
   * Encrypts a message using Hybrid Encryption (AES-GCM + RSA)
   */
  async encryptMessage(plainText, recipientPublicKeyPem) {
    const recipientPublicKey = forge.pki.publicKeyFromPem(recipientPublicKeyPem);

    // 1. Generate a random AES-256 key and IV
    const aesKey = forge.random.getBytesSync(32); 
    const iv = forge.random.getBytesSync(12); // GCM standard IV size

    // 2. Encrypt message with AES-GCM
    const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(plainText, 'utf8'));
    cipher.finish();
    const encryptedPayload = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();

    // 3. Encrypt the AES key with the Recipient's RSA Public Key
    const encryptedAesKey = recipientPublicKey.encrypt(aesKey, 'RSA-OAEP');

    return {
      ep: forge.util.encode64(encryptedPayload), // Encrypted Payload
      ek: forge.util.encode64(encryptedAesKey),  // Encrypted Key
      iv: forge.util.encode64(iv),               // Initialization Vector
      tag: forge.util.encode64(tag)              // Auth Tag for GCM integrity
    };
  },

  /**
   * Decrypts a message using the local Private Key
   */
  async decryptMessage(encryptedPackage) {
    const { ep, ek, iv, tag } = encryptedPackage;

    // 1. Retrieve Private Key from SecureStore
    const privateKeyPem = await SecureStore.getItemAsync(PRIVATE_KEY_ALIAS);
    if (!privateKeyPem) throw new Error("No private key found on device!");
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // 2. Decrypt the AES key using RSA Private Key
    const aesKey = privateKey.decrypt(forge.util.decode64(ek), 'RSA-OAEP');

    // 3. Decrypt the payload using AES-GCM
    const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
    decipher.start({
      iv: forge.util.decode64(iv),
      tag: forge.util.decode64(tag)
    });
    decipher.update(forge.util.createBuffer(forge.util.decode64(ep)));
    
    const status = decipher.finish();
    if (!status) throw new Error("Decryption failed: Message integrity compromised.");

    return decipher.output.toString('utf8');
  }
};
