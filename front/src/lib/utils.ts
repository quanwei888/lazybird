import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {plainToInstance, ClassConstructor} from 'class-transformer';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export class PlainBase {
    CLASS_NAME = "PlainBase"
    static classMap: Record<string, ClassConstructor<PlainBase>> = {}

    static register(cls: ClassConstructor<PlainBase>) {
        this.classMap[cls.name] = cls; // Fix: Corrected access to classMap
    }
    static instance(data: any): PlainBase {
        const instances = plainToInstance(this.classMap[data['CLASS_NAME']], [data]) as PlainBase[];
        return instances[0];
    }

    constructor() {
        this.CLASS_NAME = this.constructor.name;
    }

}
