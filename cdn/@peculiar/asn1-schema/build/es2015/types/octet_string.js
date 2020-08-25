import { OctetString as AsnOctetString } from "asn1js";
import { BufferSourceConverter } from "pvtsutils";
export class OctetString {
    constructor(param) {
        if (typeof param === "number") {
            this.buffer = new ArrayBuffer(param);
        }
        else {
            if (BufferSourceConverter.isBufferSource(param)) {
                this.buffer = BufferSourceConverter.toArrayBuffer(param);
            }
            else if (Array.isArray(param)) {
                this.buffer = new Uint8Array(param);
            }
            else {
                this.buffer = new ArrayBuffer(0);
            }
        }
    }
    get byteLength() {
        return this.buffer.byteLength;
    }
    get byteOffset() {
        return 0;
    }
    fromASN(asn) {
        if (!(asn instanceof AsnOctetString)) {
            throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
        }
        this.buffer = asn.valueBlock.valueHex;
        return this;
    }
    toASN() {
        return new AsnOctetString({ valueHex: this.buffer });
    }
    toSchema(name) {
        return new AsnOctetString({ name });
    }
}
