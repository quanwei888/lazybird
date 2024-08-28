import {ComponentNode, SlotNode, Node} from "./Node.js";
import {NodeManager} from "./NodeManager.js";
import {Attribute} from "./Attribute.ts";
import {PlainBase} from "../utils.ts";
import { v4 as uuidv4 } from 'uuid';

interface NodeTypeConstructor {
    id: number;
    name: string;
    attributes?: Record<string, any>;
    option?: any;
}

export class NodeType extends PlainBase {
    static ATOM_ID = 0;
    id: number;
    name: string;
    option: Record<string, any>;
    attributes: Record<string, Attribute>;

    constructor({id, name, attributes = {}, option = {}}: NodeTypeConstructor = {
        id: 0,
        name: "",
        attributes: {},
        option: {}
    }) {
        super();
        this.id = id;
        this.name = name;
        this.option = option;
        this.attributes = attributes;
    }

    addAttribute(attributeId:string,attribute: Attribute): void {
        this.attributes[attributeId] = attribute;
    }

    getAttributes(): Record<string, Attribute> {
        return this.attributes;
    }

    getAttribute(attributeId: string): Attribute {
        if (!(attributeId in this.attributes)) {
            throw new Error(`attributeId ${attributeId} does not exist.`);
        }
        return this.attributes[attributeId]
    }

    generateUniqueId(): string {
        return `${this.name}_${uuidv4()}`;
    }

    createNode(values: Record<string, any> = {}): Node {

        const id = this.generateUniqueId(); // Use instance method
        const node = this.newNode(id);

        const ignoredIds = ["id", "id", "parentId", "children"];
        Object.keys(this.attributes).forEach(attrId => {
            if (ignoredIds.includes(attrId)) return;

            const attribute = this.attributes[attrId];
            const value = values[attrId] ?? attribute.getValue();
            if (!attribute.isValid(value)) {
                throw new Error(`Invalid value for attribute ${attrId}.`);
            }
            node.attributes[attrId] = value;
        })

        node.children = [];

        const childrenAttribute = this.attributes["children"];
        if (childrenAttribute) node.children = childrenAttribute.getValue(node.id);
        return node;
    }

    newNode(id: string): Node {
        const node = new Node({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}
PlainBase.register(NodeType);
export class ComponentNodeType extends NodeType {
    newNode(id: string): Node {
        const node = new ComponentNode({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}
PlainBase.register(ComponentNodeType);
export class SlotNodeType extends NodeType {
    newNode(id: string): Node {
        const node = new SlotNode({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}
PlainBase.register(SlotNodeType);