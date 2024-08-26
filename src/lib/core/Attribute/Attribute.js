import {Serializable} from "../utils.js";
import {NodeManager, NodeTypeManager} from "../Node/index.js";

export class Attribute extends Serializable {
    static ATOM_ID = 0;
    id;
    name;
    value;

    constructor({id, name, value = null, option = {}} = {}) {
        super();
        this.id = id ? id : "attr" + Attribute.ATOM_ID++;
        this.name = name;
        this.value = value;
        this.option = option;
    }

    getValue(value) {
        if (!this.isValid(value)) {
            throw new Error(`Value ${value} is not valid for attribute ${this.name}.`);
        }
        if (value === undefined) {
            return this.value;
        }
        return value;
    }

    isValid(value) {
        return true;
    }
}

Serializable.registerClass(Attribute);

export class PropsAttribute extends Attribute {

}

Serializable.registerClass(PropsAttribute);

export class VariableAttribute extends Attribute {

}

Serializable.registerClass(VariableAttribute);

export class StyleAttribute extends Attribute {
    getClassName(value) {
        return value;
    }
}

Serializable.registerClass(StyleAttribute);

export class MapStyleAttribute extends StyleAttribute {
    constructor({id, name, value, mapping, option = {}} = {}) {
        super({id, name, value, option});

        this.mapping = mapping;
    }

    getMappedValue(value) {
        if (!this.isValid(value)) {
            throw new Error(`Value ${value} is not valid for attribute ${this.name}.`);
        }
        return this.mapping[value];
    }

    getClassName(value) {
        return this.getMappedValue(value);
    }
}

Serializable.registerClass(MapStyleAttribute);

export class LayoutAttribute extends StyleAttribute {
    getClassName(value) {
        const className = ["flex"];
        value?.direction && className.push(value.direction);
        value?.position && className.push(value.position);
        return className.join(' ');
    }
}

Serializable.registerClass(LayoutAttribute);

export class SizeAttribute extends StyleAttribute {
    getClassName(value) {
        const cssPrefix = this.option?.cssPrefix || "w";
        const className = ["flex"];
        if (value?.tag === "Hug") return ""
        if (value?.tag === "Fill") return `${cssPrefix}-full`;
        return `${cssPrefix}-[${value.size}px]`;

    }
}

Serializable.registerClass(SizeAttribute);


export class ColorAttribute extends MapStyleAttribute {

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `text-${className}`;
        }
        return className;
    }
}

Serializable.registerClass(ColorAttribute);

export class BackgroundAttribute extends MapStyleAttribute {

    getClassName(value) {
        const className = super.getClassName(value);
        if (className !== "") {
            return `bg-${className}`;
        }
        return className;
    }
}

Serializable.registerClass(BackgroundAttribute);

export class ChildrenAttribute extends Attribute {
    constructor(children) {
        super({name: "children", value: children});
        this.id = "children";
    }

    getValue(parentId) {
        const createNodeWithNewIds = (node, newParentId = null) => {
            const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
            const newId = nodeType.generateUniqueId();
            const newNode = nodeType.newNode(newId);
            newNode.attributes = {...node.attributes};
            newNode.parentId = newParentId;
            newNode.children = node.children.map(childId => {
                const childNode = NodeManager.getNode(childId);
                return createNodeWithNewIds(childNode, newNode.id).id;
            });
            newNode.option = {...node.option};
            return newNode;
        };

        const children = this.value;

        return children.map(childId => createNodeWithNewIds(NodeManager.getNode(childId), parentId).id);
    }

    isValid(value) {
        return NodeManager.getNode(value) !== null;
    }
}

Serializable.registerClass(ChildrenAttribute);