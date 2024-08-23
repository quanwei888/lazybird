import _ from "lodash";
import {AttributeManager} from "../Attribute/index.js";
import {ComponentNode, SlotNode, Node} from "./Node.js";
import {NodeTypeManager} from "./NodeTypeManager.js";
import {NodeManager} from "./NodeManager.js";

function areObjectsEqualExcludingField(obj1, obj2, excludeField) {
    const keys1 = Object.keys(obj1).filter(key => key !== excludeField);
    const keys2 = Object.keys(obj2).filter(key => key !== excludeField);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every(key => {
        if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
            return areObjectsEqualExcludingField(obj1[key], obj2[key], excludeField);
        }
        return obj1[key] === obj2[key];
    });
}


export class NodeType {
    static _TYPE_ = 'NodeType';
    static ID = 0

    constructor(id, name, attributeIds = [], defaultValues = {}, defaultChildren = [], option = {}) {
        this.id = id;
        this.name = name;
        this.option = option;
        this.option.canDrag = option.canDrag ?? true;
        this.option.canDrop = option.canDrop ?? true;
        this.option.allowedEditAttribute = option.allowedEditAttribute ?? [];
        this.oldDefaultValues = null;
        this.attributes = attributeIds.map(attrId => {
            const attribute = AttributeManager.getAttribute(attrId);
            if (!attribute) {
                throw new Error(`Attribute with id ${attrId} is not defined.`);
            }
            return attribute;
        });
        this.defaultValues = {};
        this.defaultChildren = defaultChildren;

        this.attributes.forEach(attribute => {
            this.defaultValues[attribute.id] = defaultValues[attribute.id] ?? attribute.defaultValue;
        });
    }

    getAttributes() {
        return this.attributes;
    }

    generateUniqueId() {
        return `${this.id}_${NodeType.ID++}`;
    }

    cloneDefaultChildren(parentId = null) {
        const createNodeWithNewIds = (node, newParentId = null) => {
            const newId = this.generateUniqueId();
            const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
            const newNode = nodeType.newNode(newId, parentId);
            newNode.attributes = {...node.attributes};
            newNode.parentId = newParentId;
            newNode.children = node.children.map(childId => {
                const childNode = NodeManager.getNode(childId);
                return createNodeWithNewIds(childNode, newNode).id;
            });
            return newNode;
        };

        return this.defaultChildren.map(childId => createNodeWithNewIds(NodeManager.getNode(childId), parentId).id);
    }

    createNode(values = {}) {
        const id = this.generateUniqueId(); // Use instance method
        const node = this.newNode(id, this.id);
        node.option = this.option;
        this.attributes.forEach(attribute => {
            node.attributes[attribute.id] = values[attribute.id] ?? this.defaultValues[attribute.id];
        });
        node.children = this.cloneDefaultChildren(node.id);
        return node;
    }

    updateNode(node) {
        this.attributes.forEach(attribute => {
            if (!_.isEqual(node.attributes[attribute.id], this.oldDefaultValues?.[attribute.id])) {
                //如果属性被修改过，则不更新默认值
                return;
            }
            node.attributes[attribute.id] = this.defaultValues[attribute.id];
        });

        node.children = this.cloneDefaultChildren(node.id);
        //if (areObjectsEqualExcludingField({ children: node.children }, { children: this.defaultChildren }, "id")) { // Fix typo
        //    node.children = this.cloneDefaultChildren(node.id);
        //}
    }

    updateAllNodes() {
        NodeManager.nodes.forEach(node => {
            if (node.nodeTypeId === this.id) {
                this.updateNode(node);
            }
        });
    }

    newNode(id, parentId) {
        const node = new Node(id, this.id, parentId);
        NodeManager.addNode(node);
        return node;
    }

    setDefaultChildren(children) {
        this.defaultChildren = children;
    }

    getDefaultChildren() {
        return this.defaultChildren;
    }

    setDefaultValues(values) {
        this.oldDefaultValues = this.defaultValues;
        this.defaultValues = values;
    }

    getDefaultValues() {
        return this.defaultValues;
    }
}

export class ComponentNodeType extends NodeType {
    static _TYPE_ = 'ComponentNodeType';

    newNode(id, nodeTypeId, parentId) {
        return new ComponentNode(id, this.id, parentId);
    }
}

export class SlotNodeType extends NodeType {
    static _TYPE_ = 'SlotNodeType';

    newNode(id, nodeTypeId, parentId) {
        return new SlotNode(id, this.id, parentId);
    }
}
