import { ProviderCrypto } from "./provider";
import { ProviderStorage } from "./storage";
import { HashedAlgorithm } from "./types";
import { CryptoKey } from './key';
export declare class SubtleCrypto {
    static isHashedAlgorithm(data: any): data is HashedAlgorithm;
    protected providers: ProviderStorage;
    digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
    generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | globalThis.CryptoKey>;
    sign(algorithm: AlgorithmIdentifier, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    verify(algorithm: AlgorithmIdentifier, key: CryptoKey, signature: BufferSource, data: BufferSource): Promise<boolean>;
    encrypt(algorithm: AlgorithmIdentifier, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    decrypt(algorithm: AlgorithmIdentifier, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    deriveBits(algorithm: AlgorithmIdentifier, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
    deriveKey(algorithm: AlgorithmIdentifier, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<globalThis.CryptoKey>;
    exportKey(format: "raw" | "spki" | "pkcs8", key: CryptoKey): Promise<ArrayBuffer>;
    exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
    exportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    importKey(format: KeyFormat, keyData: JsonWebKey | BufferSource, algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<globalThis.CryptoKey>;
    wrapKey(format: KeyFormat, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AlgorithmIdentifier): Promise<ArrayBuffer>;
    unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier, unwrappedKeyAlgorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<globalThis.CryptoKey>;
    protected checkRequiredArguments(args: any[], size: number, methodName: string): void;
    protected prepareAlgorithm(algorithm: AlgorithmIdentifier): Algorithm | HashedAlgorithm;
    protected getProvider(name: string): ProviderCrypto;
    protected checkCryptoKey(key: CryptoKey): void;
}
