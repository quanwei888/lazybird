import 'reflect-metadata';
import { plainToInstance, instanceToPlain } from 'class-transformer';

export class Serializable {
    static classMap = {};
    constructor() {
        this._CLASS_ = this.constructor.name;
    }

    toJSON() {
        return instanceToPlain(this);
    }

    static fromJSON(plainObject) {
        const className = plainObject._CLASS_;
        const cls = Serializable.classMap[className];
        if (!cls) {
            throw new Error(`Class ${className} not found`);
        }
        return plainToInstance(cls, plainObject);
    }

    static registerClass(cls) {
        Serializable.classMap[cls.name] = cls;
    }
}

export function validateParams(params, schema) {
    for (const [key, type] of Object.entries(schema)) {
        if (type === 'array') {
            if (!Array.isArray(params[key])) {
                throw new TypeError(`${key} must be an array`);
            }
        } else if (typeof params[key] !== type) {
            throw new TypeError(`${key} must be a ${type}`);
        }
    }
}