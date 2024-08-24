import {Serializable} from "../utils.js";

export class Attribute extends Serializable {

    constructor({id, name, defaultValue = null, option = {}}) {
        super();
        this.id = id;
        this.name = name;
        this.defaultValue = defaultValue;
        this.option = option;
    }

    isValid(value) {
        return true;
    }

    setDefaultValue(value) {
        this.defaultValue = value;
    }

    setName(name) {
        this.name = name;
    }
}

Serializable.registerClass(Attribute);

// 新增子类，表示属性的值只能在一个集合里筛选
export class EnumAttribute extends Attribute {

    constructor({id, name, defaultValue, allowedValues, option = {}}) {
        super({id, name, defaultValue, option});
        this.allowedValues = allowedValues;
    }

    isValid(value) {
        return this.allowedValues.includes(value);
    }
}

Serializable.registerClass(EnumAttribute);

// 新增子类，表示支持映射的属性
export class MappedAttribute extends EnumAttribute {

    constructor({id, name, defaultValue, mapping, option = {}}) {
        super({id, name, defaultValue, allowedValues: Object.keys(mapping), option});

        if (!Object.keys(mapping).includes(defaultValue)) {
            throw new Error(`Default value ${defaultValue} is not in the allowed mapping.`);
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

export class LayoutStyleAttribute extends StyleAttribute {

    static mapping = {
        xLeftTop: {
            direction: "x",
            horizontalAlign: "start",
            verticalAlign: "start",
        },
        xLeftCenter: {
            direction: "x",
            horizontalAlign: "start",
            verticalAlign: "center",
        },
        xLeftEnd: {
            direction: "x",
            horizontalAlign: "start",
            verticalAlign: "end",
        },
        xCenterTop: {
            direction: "x",
            horizontalAlign: "center",
            verticalAlign: "start",
        },
        xCenterCenter: {
            direction: "x",
            horizontalAlign: "center",
            verticalAlign: "center",
        },
        xCenterEnd: {
            direction: "x",
            horizontalAlign: "center",
            verticalAlign: "end",
        },
        xEndTop: {
            direction: "x",
            horizontalAlign: "end",
            verticalAlign: "start",
        },
        xEndCenter: {
            direction: "x",
            horizontalAlign: "end",
            verticalAlign: "center",
        },
        xEndEnd: {
            direction: "x",
            horizontalAlign: "end",
            verticalAlign: "end",
        },
        yTopLeft: {
            direction: "y",
            horizontalAlign: "start",
            verticalAlign: "start",
        },
        yTopCenter: {
            direction: "y",
            horizontalAlign: "center",
            verticalAlign: "start",
        },
        yTopEnd: {
            direction: "y",
            horizontalAlign: "end",
            verticalAlign: "start",
        },
        yCenterLeft: {
            direction: "y",
            horizontalAlign: "start",
            verticalAlign: "center",
        },
        yCenterCenter: {
            direction: "y",
            horizontalAlign: "center",
            verticalAlign: "center",
        },
        yCenterEnd: {
            direction: "y",
            horizontalAlign: "end",
            verticalAlign: "center",
        },
        yEndLeft: {
            direction: "y",
            horizontalAlign: "start",
            verticalAlign: "end",
        },
        yEndCenter: {
            direction: "y",
            horizontalAlign: "center",
            verticalAlign: "end",
        },
        yEndEnd: {
            direction: "y",
            horizontalAlign: "end",
            verticalAlign: "end",
        }

    }

    constructor({id, name, defaultValue}) {
        super({id, name, defaultValue, mapping: LayoutStyleAttribute.mapping});
    }

    getClassName(value) {
        const {direction = "x", verticalAlign = "start", horizontalAlign = "start"} = value
        const classNames = []

        if (direction == "x") {
            classNames.push("flex flex-row");
            switch (verticalAlign) {
                case "center":
                    classNames.push("items-center");
                    break;
                case "end":
                    classNames.push("items-end");
                    break;
            }

            switch (horizontalAlign) {
                case "center":
                    classNames.push("justify-center");
                    break;
                case "end":
                    classNames.push("justify-end");
                    break;
            }

        } else {
            classNames.push("flex flex-column");
            switch (verticalAlign) {
                case "center":
                    classNames.push("items-center");
                    break;
                case "end":
                    classNames.push("items-end");
                    break;
            }

            switch (horizontalAlign) {
                case "center":
                    classNames.push("justify-center");
                    break;
                case "end":
                    classNames.push("justify-end");
                    break;
            }

        }

        return classNames.join(" ");
    }
}

Serializable.registerClass(LayoutStyleAttribute)
