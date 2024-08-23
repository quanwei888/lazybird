import {NodeTypeManager} from './NodeTypeManager.js';

// 节点，包含实际的属性值
export class Node {
    static _TYPE_ = 'Node';

    constructor(id, nodeTypeId) {
        this.id = id;
        this.nodeTypeId = nodeTypeId;
        this.parentId = null;
        this.attributes = {};
        this.children = []; // children now only store ids
    }
    direction() {
        return "vertical";
    }

    setAttribute(attributeId, value) {
        const nodeType = NodeTypeManager.getNodeType(this.nodeTypeId);

        if (!nodeType) {
            throw new Error(`NodeType with id ${this.nodeTypeId} is not defined.`);
        }

        const attribute = nodeType.attributes.find(attr => attr.id === attributeId);

        if (!attribute) {
            throw new Error(`Attribute with id ${attributeId} is not defined in NodeType ${this.nodeTypeId}.`);
        }

        if (!attribute.isValid(value)) {
            throw new Error(`Invalid value for attribute ${attributeId}.`);
        }

        this.attributes[attributeId] = value;
    }

    getAttribute(attributeId) {
        let attributeValue = this.attributes[attributeId];
        const visited = new Set();

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

export class ComponentNode extends Node {
    static _TYPE_ = 'ComponentNode';
}

export class SlotNode extends Node {
    static _TYPE_ = 'SlotNode';
}