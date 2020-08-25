import { KeyUsages, ProviderKeyUsages } from "./types";
export interface IProviderCheckOptions {
    keyUsage?: boolean;
}
export declare abstract class ProviderCrypto {
    /**
     * Name of the algorithm
     */
    abstract readonly name: string;
    /**
     * Key usages for secret key or key pair
     */
    abstract readonly usages: ProviderKeyUsages;
    digest(algorithm: Algorithm, data: ArrayBuffer): Promise<ArrayBuffer>;
    checkDigest(algorithm: Algorithm, data: ArrayBuffer): void;
    onDigest(algorithm: Algorithm, data: ArrayBuffer): Promise<ArrayBuffer>;
    generateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey>;
    checkGenerateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): void;
    checkGenerateKeyParams(algorithm: Algorithm): void;
    onGenerateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey>;
    sign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    checkSign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer): void;
    onSign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    verify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean>;
    checkVerify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): void;
    onVerify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean>;
    encrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions): Promise<ArrayBuffer>;
    checkEncrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions): void;
    onEncrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    decrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions): Promise<ArrayBuffer>;
    checkDecrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions): void;
    onDecrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    deriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number, options?: IProviderCheckOptions): Promise<ArrayBuffer>;
    checkDeriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number, options?: IProviderCheckOptions): void;
    onDeriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
    exportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    checkExportKey(format: KeyFormat, key: CryptoKey): void;
    onExportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    importKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    checkImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): void;
    onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    checkAlgorithmName(algorithm: Algorithm): void;
    checkAlgorithmParams(algorithm: Algorithm): void;
    checkDerivedKeyParams(algorithm: Algorithm): void;
    checkKeyUsages(usages: KeyUsages, allowed: KeyUsages): void;
    checkCryptoKey(key: CryptoKey, keyUsage?: KeyUsage): void;
    checkRequiredProperty(data: object, propName: string): void;
    checkHashAlgorithm(algorithm: Algorithm, hashAlgorithms: string[]): void;
    checkImportParams(algorithm: Algorithm): void;
    checkKeyFormat(format: any): void;
    checkKeyData(format: KeyFormat, keyData: any): void;
    protected prepareData(data: any): ArrayBuffer;
}
