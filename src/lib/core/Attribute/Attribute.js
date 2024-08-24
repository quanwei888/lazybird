import {Serializable} from "../utils.js";

export class Attribute extends Serializable {
    static ID = 0;

    constructor({name, value = null, option = {}}) {
        super();
        this.id = "attr" + Attribute.ID++;
        this.name = name;
        this.value = value;
        this.option = option;
    }

    getValue() {
        return this.value;
    }

    isValid(value) {
        return true;
    }
}

Serializable.registerClass(Attribute);

// 新增子类，表示属性的值只能在一个集合里筛选
export class EnumAttribute extends Attribute {

    constructor({name, value, allowedValues, option = {}}) {
        super({name, value, option});
        this.allowedValues = allowedValues;
    }

    isValid(value) {
        return this.allowedValues.includes(value);
    }
}

Serializable.registerClass(EnumAttribute);

// 新增子类，表示支持映射的属性
export class MappedAttribute extends EnumAttribute {

    constructor({name, value, mapping, option = {}}) {
        super({name, value, allowedValues: Object.keys(mapping), option});

        if (!Object.keys(mapping).includes(value)) {
            throw new Error(`Default value ${value} is not in the allowed mapping.`);
        }

        this.mapping = mapping;
    }

    getMappedValue(value) {
        return this.mapping[value] || null;
    }
}

Serializable.registerClass(MappedAttribute);

// 增子类，表示支持样式的属性
export class StyleAttribute extends MappedAttribute {

    getClassName(value) {
        return this.getMappedValue(value);
    }
}

Serializable.registerClass(StyleAttribute);

export class ColorAttribute extends StyleAttribute {

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `text-${className}`;
        }
        return className;
    }
}

Serializable.registerClass(ColorAttribute);

export class BackgroundAttribute extends StyleAttribute {

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `bg-${className}`;
        }
        return className;
    }
}

Serializable.registerClass(BackgroundAttribute);
