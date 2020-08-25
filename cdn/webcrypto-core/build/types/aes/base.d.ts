import { ProviderCrypto } from "../provider";
export declare abstract class AesProvider extends ProviderCrypto {
    checkGenerateKeyParams(algorithm: AesKeyGenParams): void;
    checkDerivedKeyParams(algorithm: AesKeyGenParams): void;
    abstract onGenerateKey(algorithm: AesKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
}
