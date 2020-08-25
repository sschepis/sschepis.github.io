import { CryptoKey } from "../key";
import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";
export declare abstract class EcdhProvider extends EllipticProvider {
    readonly name = "ECDH";
    usages: ProviderKeyUsages;
    namedCurves: string[];
    checkAlgorithmParams(algorithm: EcdhKeyDeriveParams): void;
    abstract onDeriveBits(algorithm: EcdhKeyDeriveParams, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
}
