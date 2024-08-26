import _ from "lodash";
import {Attribute, AttributeManager} from "../Attribute/index.js";
import {ComponentNode, SlotNode, Node} from "./Node.js";
import {NodeTypeManager} from "./NodeTypeManager.js";
import {NodeManager} from "./NodeManager.js";
import {Serializable} from "../utils.js";


export class NodeType extends Serializable {

    static ID = 0

    constructor({id, name, attributes = [], option = {}}) {
        super();
        this.id = id;
        this.name = name;
        this.option = option;
        this.option.canDrag = option.canDrag ?? true;
        this.option.canDrop = option.canDrop ?? true;
        this.option.allowedEditAttribute = option.allowedEditAttribute ?? [];
        this.attributes = attributes;
    }

    getAttributes() {
        return this.attributes;
    }

    getAttribute(id) {
        return this.attributes.find(attribute => attribute.id === id);
    }

    generateUniqueId() {
        return `${this.id}_${NodeType.ID++}`;
    }


    createNode(values = {}) {
        const id = this.generateUniqueId(); // Use instance method
        const node = this.newNode(id, this.id);
        //node.option = this.option;

        const ignoredIds = ["id", "parentId", "children"];
        this.attributes.forEach(attribute => {
            if (ignoredIds.includes(attribute.id)) {
                return;
            }
            const value = values[attribute.id] ?? attribute.getValue();
            if (!attribute.isValid(value)) {
                throw new Error(`Invalid value for attribute ${attribute.id}.`);
            }
            node.attributes[attribute.id] = value;
        });

        node.children = [];

        const childrenAttribute = this.getAttribute("children");
        if (childrenAttribute) node.children = childrenAttribute.getValue(node.id);

        //node.children = this.cloneDefaultChildren(node.id);
        return node;
    }

    updateNode(node) {
        this.attributes.forEach(attribute => {
            node.attributes[attribute.id] = attribute.getValue();
        });

        node.children = this.cloneDefaultChildren(node.id);
    }

    updateAllNodes() {
        NodeManager.nodes.forEach(node => {
            if (node.nodeTypeId === this.id) {
                this.updateNode(node);
            }
        });
    }

    newNode(id) {
        const node = new Node({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}

Serializable.registerClass(NodeType);

export class ComponentNodeType extends NodeType {
    newNode(id) {
        const node = new ComponentNode({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}

Serializable.registerClass(ComponentNodeType);

export class SlotNodeType extends NodeType {
    newNode(id) {
        const node = new SlotNode({id, nodeTypeId: this.id, name: this.name});
        NodeManager.addNode(node);
        return node;
    }
}

Serializable.registerClass(SlotNodeType);
