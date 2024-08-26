import {AttributeManager} from "../Attribute/index.js";

// 修改 NodeTypeManager 类，增加 addAttributeToType 方法
export class NodeTypeManager {
    static nodeTypes = new Map();

    static addNodeType(nodeType) {
        if (!this.nodeTypes.has(nodeType.id)) {
            this.nodeTypes.set(nodeType.id, nodeType);
        } else {
            throw new Error(`NodeType with id ${nodeType.id} already exists.`);
        }
    }

    static getNodeTypes() {
        return this.nodeTypes;
    }

    static getNodeType(id) {
        return this.nodeTypes.get(id);
    }

    static removeNodeType(id) {
        return this.nodeTypes.delete(id);
    }

    static addAttributeToType(nodeTypeId, attributeId, defaultValue) {
        const nodeType = this.getNodeType(nodeTypeId);
        if (!nodeType) {
            throw new Error(`NodeType with id ${nodeTypeId} is not defined.`);
        }

        const attribute = AttributeManager.getAttribute(attributeId);
        if (!attribute) {
            throw new Error(`Attribute with id ${attributeId} is not defined.`);
        }

        nodeType.attributes.push(attribute);
        nodeType.defaultValues[attribute.id] = defaultValue ?? attribute.defaultValue;

    }

    static removeAttributeFromType(nodeTypeId, attributeId) {
        const nodeType = this.getNodeType(nodeTypeId);
        if (!nodeType) {
            throw new Error(`NodeType with id ${nodeTypeId} is not defined.`);
        }

        const attributeIndex = nodeType.attributes.findIndex(attr => attr.id === attributeId);
        if (attributeIndex === -1) {
            throw new Error(`Attribute with id ${attributeId} is not defined in NodeType ${nodeTypeId}.`);
        }

        nodeType.attributes.splice(attributeIndex, 1);
        delete nodeType.defaultValues[attributeId];

    }

    static updateAttributeForType(nodeTypeId, attributeId, defaultValue) {
        const nodeType = this.getNodeType(nodeTypeId);
        if (!nodeType) {
            throw new Error(`NodeType with id ${nodeTypeId} is not defined.`);
        }

        // Update the attribute
        const attribute = AttributeManager.getAttribute(attributeId);
        if (!attribute) {
            throw new Error(`Attribute with id ${attributeId} is not defined in NodeType ${nodeTypeId}.`);
        }
        nodeType.defaultValues[attribute.id] = defaultValue ?? attribute.defaultValue;
    }
}
