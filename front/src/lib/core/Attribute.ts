import {NodeManager} from "./NodeManager.ts";
import {NodeTypeManager} from "./NodeTypeManager.ts";
import {PlainBase} from "../utils.ts";
import {SlotNode} from "@/lib/core/Node.ts";

interface AttributeConstructor {
    name: string;
    value?: any;
    option?: any;
}

export class Attribute extends PlainBase {
    static ATOM_ID = 0;
    name: string;
    value: any;
    option: any;

    constructor({name, value = null, option = {}}: AttributeConstructor = {
        name: '',
        value: null,
        option: {}
    }) {
        super();
        this.name = name;
        this.value = value;
        this.option = option;
    }

    getValue(value: any = undefined) {
        if (!this.isValid(value)) {
            throw new Error(`Value ${value} is not valid for attribute ${this.name}.`);
        }
        if (value === undefined) {
            return this.value;
        }
        return value;
    }

    isValid(value: any) {
        return true;
    }
}
PlainBase.register(Attribute);

export class PropsAttribute extends Attribute {
}
PlainBase.register(PropsAttribute);

export class VariableAttribute extends Attribute {
}
PlainBase.register(VariableAttribute);

export class StyleAttribute extends Attribute {
    getClassName(value: any) {
        return value;
    }
}
PlainBase.register(StyleAttribute);

interface MapStyleAttributeConstructor extends AttributeConstructor {
    mapping: any;
}

export class MapStyleAttribute extends StyleAttribute {
    mapping: any;

    constructor({name, value, mapping, option = {}}: MapStyleAttributeConstructor = {
        name: '',
        value: null,
        mapping: {},
        option: {}
    }) {
        super({name, value, option});
        this.mapping = mapping;
    }

    getMappedValue(value: any) {
        if (!this.isValid(value)) {
            throw new Error(`Value ${value} is not valid for attribute ${this.name}.`);
        }
        return this.mapping[value];
    }

    getClassName(value: any) {
        return this.getMappedValue(value);
    }
}
PlainBase.register(MapStyleAttribute);
export class LayoutAttribute extends StyleAttribute {
    getClassName(value: any) {
        const className = ["flex"];
        value?.direction && className.push(value.direction);
        value?.position && className.push(value.position);
        return className.join(' ');
    }
}
PlainBase.register(LayoutAttribute);
export class SizeAttribute extends StyleAttribute {
    getClassName(value: any) {
        const cssPrefix = this.option?.cssPrefix || "w";
        const className = ["flex"];
        if (value?.tag === "Hug") return "";
        if (value?.tag === "Fill") return `${cssPrefix}-full`;
        return `${cssPrefix}-[${value.size}px]`;
    }
}
PlainBase.register(SizeAttribute);
export class ColorAttribute extends MapStyleAttribute {
    getClassName(value: any) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `text-${className}`;
        }
        return className;
    }
}
PlainBase.register(ColorAttribute);
export class BackgroundAttribute extends MapStyleAttribute {
    getClassName(value: any) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `bg-${className}`;
        }
        return className;
    }
}
PlainBase.register(BackgroundAttribute);
export class ChildrenAttribute extends Attribute {
    constructor(children: any) {
        super({name: "children", value: children});
    }

    getValue(parentId: any) {
        const createNodeWithNewIds = (node: any, newParentId: any = null) => {
            const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
            if (!nodeType) {
                throw new Error(`Node type ${node.nodeTypeId} not found`);
            }
            const newId = nodeType.generateUniqueId();
            const newNode = nodeType.newNode(newId);
            newNode.attributes = {...node.attributes};
            newNode.parentId = newParentId;
            newNode.children = node.children.map((childId: any) => {
                const childNode = NodeManager.getNode(childId);
                return createNodeWithNewIds(childNode, newNode.id).id;
            });
            newNode.option = {...node.option};
            return newNode;
        };

        const children = this.value;

        return children.map((childId: any) => createNodeWithNewIds(NodeManager.getNode(childId), parentId).id);
    }

    isValid(value: any) {
        if (!Array.isArray(value)) return false;

        for (const childId of value) {
            if (!NodeManager.exists(childId)) {
                return false;
            }
        }
        return true;
    }
}
PlainBase.register(ChildrenAttribute);PlainBase