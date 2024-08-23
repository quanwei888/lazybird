// 定义属性的结构
export class Attribute {
    static _TYPE_ = 'Attribute';

    constructor(id, name, defaultValue, setting = {}) {
        this.id = id;
        this.name = name;
        this.defaultValue = defaultValue;
        this.setting = setting;
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

// 新增子类，表示属性的值只能在一个集合里筛选
export class EnumAttribute extends Attribute {
    static _TYPE_ = 'EnumAttribute';

    constructor(id, name, defaultValue, allowedValues, setting = {}) {
        super(id, name, defaultValue, setting);
        this.allowedValues = allowedValues;
    }

    isValid(value) {
        return this.allowedValues.includes(value);
    }
}

// 新增子类，表示支持映射的属性
export class MappedAttribute extends EnumAttribute {
    static _TYPE_ = 'MappedAttribute';

    constructor(id, name, defaultValue, mapping, setting = {}) {
        super(id, name, defaultValue, Object.keys(mapping), setting);

        if (!Object.keys(mapping).includes(defaultValue)) {
            throw new Error(`Default value ${defaultValue} is not in the allowed mapping.`);
        }

        this.mapping = mapping;
    }

    getMappedValue(value) {
        return this.mapping[value] || null;
    }
}

// 增子类，表示支持样式的属性
export class StyleAttribute extends MappedAttribute {
    static _TYPE_ = 'StyleAttribute';

    getClassName(value) {
        return this.getMappedValue(value);
    }
}

export class ColorAttribute extends StyleAttribute {
    static _TYPE_ = 'ColorAttribute';

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `text-${className}`;
        }
        return className;
    }
}

export class BackgroundAttribute extends StyleAttribute {
    static _TYPE_ = 'ColorAttribute';

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `bg-${className}`;
        }
        return className;
    }
}

export class LayoutStyleAttribute extends StyleAttribute {
    static _TYPE_ = 'LayoutStyleAttribute';
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

    constructor(id, name, defaultValue) {
        super(id, name, defaultValue, LayoutStyleAttribute.mapping);
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
