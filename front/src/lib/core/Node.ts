import {NodeTypeManager} from './NodeTypeManager.js';
import {PlainBase} from "../utils.ts";

interface NodeConstructor {
    id: string;
    nodeTypeId: number;
    name: string;
    parentId?: string | null;
    attributes?: Record<string, any>;
    children?: string[];
    option?: Record<string, any>;
}

// 节点，包含实际的属性值
export class Node extends PlainBase {
    id: string;
    name: string;
    nodeTypeId: number;
    parentId: string | null;
    attributes: Record<string, any>;
    children: string[];
    option?: Record<string, any>;

    constructor({
                    id,
                    nodeTypeId,
                    name,
                    parentId = null,
                    attributes = {},
                    children = [],
                    option = {}
                }: NodeConstructor = {
        id: "",
        nodeTypeId: 0,
        name: "",
        parentId: null,
        attributes: {},
        children: [],
        option: {}
    }) {
        super();
        this.id = id;
        this.name = name;
        this.nodeTypeId = nodeTypeId;
        this.parentId = parentId;
        this.attributes = attributes;
        this.children = children;
        this.option = option;
    }

    direction(): string {
        return "vertical";
    }

    canDrop(): boolean {
        const nodeType = NodeTypeManager.getNodeType(this.nodeTypeId);
        return nodeType.option.canDrop;
    }

    canDrag(): boolean {
        const nodeType = NodeTypeManager.getNodeType(this.nodeTypeId);
        return nodeType && nodeType.option.canDrag;
    }

    setAttribute(attributeId: string, value: any): void {
        const nodeType = NodeTypeManager.getNodeType(this.nodeTypeId);
        const attribute = nodeType.getAttribute(attributeId);
        if (!attribute.isValid(value)) {
            throw new Error(`Invalid value for attribute ${attributeId}.`);
        }

        this.attributes[attributeId] = value;
    }

    getAttribute(attributeId: string): any {
        let attributeValue = this.attributes[attributeId];
        const visited = new Set<string>();

        while (typeof attributeValue === 'string' && attributeValue.startsWith('{{') && attributeValue.endsWith('}}')) {
            if (visited.has(attributeValue)) {
                throw new Error(`Circular reference detected for attribute: ${attributeValue}`);
            }

            visited.add(attributeValue);
            const variableName = attributeValue.slice(2, -2).trim();
            attributeValue = this.attributes[variableName];
        }

        if (attributeValue === undefined) {
            throw new Error(`Attribute with id ${attributeId} is not defined.`);
        }

        return attributeValue;
    }
}
PlainBase.register(Node);
export class ComponentNode extends Node {
}
PlainBase.register(ComponentNode);
export class SlotNode extends Node {
}
PlainBase.register(SlotNode);