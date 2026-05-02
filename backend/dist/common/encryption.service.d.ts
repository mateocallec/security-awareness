export declare class EncryptionService {
    private readonly algorithm;
    private readonly key;
    constructor();
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
}
