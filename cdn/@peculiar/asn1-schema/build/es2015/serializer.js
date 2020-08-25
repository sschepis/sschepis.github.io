import * as asn1 from "asn1js";
import * as converters from "./converters";
import { AsnPropTypes, AsnTypeTypes } from "./enums";
import { isConvertible, isArrayEqual } from "./helper";
import { schemaStorage } from "./storage";
export class AsnSerializer {
    static serialize(obj) {
        if (obj instanceof asn1.BaseBlock) {
            return obj.toBER(false);
        }
        return this.toASN(obj).toBER(false);
    }
    static toASN(obj) {
        if (obj && isConvertible(obj.constructor)) {
            return obj.toASN();
        }
        const target = obj.constructor;
        const schema = schemaStorage.get(target);
        schemaStorage.cache(target);
        let asn1Value = [];
        if (schema.itemType) {
            if (typeof schema.itemType === "number") {
                const converter = converters.defaultConverter(schema.itemType);
                if (!converter) {
                    throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
                }
                asn1Value = obj.map((o) => converter.toASN(o));
            }
            else {
                asn1Value = obj.map((o) => this.toAsnItem({ type: schema.itemType }, "[]", target, o));
            }
        }
        else {
            for (const key in schema.items) {
                const schemaItem = schema.items[key];
                const objProp = obj[key];
                if (objProp === undefined
                    || schemaItem.defaultValue === objProp
                    || (typeof schemaItem.defaultValue === "object" && typeof objProp === "object"
                        && isArrayEqual(this.serialize(schemaItem.defaultValue), this.serialize(objProp)))) {
                    continue;
                }
                let asn1Item = AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
                if (typeof schemaItem.context === "number") {
                    if (schemaItem.implicit) {
                        if (!schemaItem.repeated
                            && (typeof schemaItem.type === "number" || isConvertible(schemaItem.type))) {
                            const value = {};
                            value.valueHex = asn1Item.valueBlock.toBER();
                            asn1Value.push(new asn1.Primitive(Object.assign({ optional: schemaItem.optional, idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context,
                                } }, value)));
                        }
                        else {
                            asn1Value.push(new asn1.Constructed({
                                optional: schemaItem.optional,
                                idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context,
                                },
                                value: asn1Item.valueBlock.value,
                            }));
                        }
                    }
                    else {
                        asn1Value.push(new asn1.Constructed({
                            optional: schemaItem.optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: schemaItem.context,
                            },
                            value: [asn1Item],
                        }));
                    }
                }
                else if (schemaItem.repeated) {
                    asn1Value = asn1Value.concat(asn1Item);
                }
                else {
                    asn1Value.push(asn1Item);
                }
            }
        }
        let asnSchema;
        switch (schema.type) {
            case AsnTypeTypes.Sequence:
                asnSchema = new asn1.Sequence({ value: asn1Value });
                break;
            case AsnTypeTypes.Set:
                asnSchema = new asn1.Set({ value: asn1Value });
                break;
            case AsnTypeTypes.Choice:
                if (!asn1Value[0]) {
                    throw new Error(`Schema '${target.name}' has wrong data. Choice cannot be empty.`);
                }
                asnSchema = asn1Value[0];
                break;
        }
        return asnSchema;
    }
    static toAsnItem(schemaItem, key, target, objProp) {
        let asn1Item;
        if (typeof (schemaItem.type) === "number") {
            const converter = schemaItem.converter;
            if (!converter) {
                throw new Error(`Property '${key}' doesn't have converter for type ${AsnPropTypes[schemaItem.type]} in schema '${target.name}'`);
            }
            if (schemaItem.repeated) {
                const items = Array.from(objProp, (element) => converter.toASN(element));
                const Container = schemaItem.repeated === "sequence"
                    ? asn1.Sequence
                    : asn1.Set;
                asn1Item = new Container({
                    value: items,
                });
            }
            else {
                asn1Item = converter.toASN(objProp);
            }
        }
        else {
            if (schemaItem.repeated) {
                const items = Array.from(objProp, (element) => this.toASN(element));
                const Container = schemaItem.repeated === "sequence"
                    ? asn1.Sequence
                    : asn1.Set;
                asn1Item = new Container({
                    value: items,
                });
            }
            else {
                asn1Item = this.toASN(objProp);
            }
        }
        return asn1Item;
    }
}
