import {
    NodeTypeManager,
    ComponentNodeType, NodeManager
} from "../Node/index.js";

import * as ComAttr from "./CommonAttribute.js";
import UIStack from "./Stack.js";
import {Attribute} from "../Attribute/index.js";


class ChildrenAttribute extends Attribute {
    constructor(children) {
        super({name: "children", value: children});
        this.id = "children";
    }

    getValue(parentId) {
        const createNodeWithNewIds = (node, newParentId = null) => {
            const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
            const newId = nodeType.generateUniqueId();
            const newNode = nodeType.newNode(newId, parentId);
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
}

const root = UIStack.createNode();
NodeManager.insertNode(UIStack.createNode().id, root.id)
const children = [
    root.id
]

const nodeType = new ComponentNodeType({
    id: "UIComponent",
    name: 'Component',
    attributes: [ComAttr.text(), new ChildrenAttribute(children)],
    option: {
        render: "UIComponent",
        canDrop: false,
        canDrag: true,
    }
})
NodeTypeManager.addNodeType(nodeType);

export default nodeType;