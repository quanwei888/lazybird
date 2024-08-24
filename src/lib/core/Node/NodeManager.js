// 节点管理器
import {NodeTypeManager} from "./NodeTypeManager.js";
import {ComponentNode} from "@/lib/core/index.js";

export class NodeManager {
    static nodes = new Map();
    static currentId = 0; // Add a static property for ID generation

    static addNode(node) {
        if (!this.nodes.has(node.id)) {
            this.nodes.set(node.id, node);
        } else {
            console.log(`Node with id ${node.id} already exists.`);
        }
    }

    static insertNode(nodeId, parentId, position = null) {
        const node = this.getNode(nodeId);
        // 检查是否提供了父节点ID
        if (parentId) {
            const parentNode = this.getNode(parentId);
            // 如果父节点不存在，抛出错误
            if (!parentNode) {
                throw new Error(`Parent node with id ${parentId} is not defined.`);
            }

            // 检查节点是否已经有父节点
            if (node.parentId) {
                const oldParentNode = this.getNode(node.parentId);
                if (oldParentNode) {
                    // 从旧的父节点删除
                    oldParentNode.children = oldParentNode.children.filter(childId => childId !== node.id);
                }
            }

            // 检查节点是否已经是新的父节点的子节点
            const existingChildIndex = parentNode.children.indexOf(node.id);
            if (existingChildIndex !== -1) {
                // 如果是新的父节点的子节点，先从新的父节点删除
                parentNode.children.splice(existingChildIndex, 1);
            }
        } else {
            // 如果没有提供父节点ID，抛出错误
            throw new Error(`Parent node id is not defined.`);
        }

        // 作为新节点插入
        node.parentId = parentId;
        const parentNode = this.getNode(parentId);
        // 将新节点插入到父节点的子节点列表中的指定位置
        //console.log(`Inserting  [${nodeId}] into [${position}] of [${parentNode.id}]`, this.nodes);
        this.insertAtPosition(parentNode.children, node.id, position);
    }

    static insertAtPosition(children, nodeId, position) {
        if (position < 0 || position >= children.length) {
            children.push(nodeId);
        } else {
            children.splice(position, 0, nodeId);
        }
    }

    static getNode(id) {
        return this.nodes.get(id);
    }

    static removeNode(id) {
        const node = this.getNode(id);
        if (node) {
            if (node.parentId) {
                const parentNode = this.getNode(node.parentId);
                if (parentNode) {
                    parentNode.children = parentNode.children.filter(childId => childId !== id);
                }
            }
            return this.nodes.delete(id);
        }
        return false;
    }

    static isAncestor(ancestorId, nodeId) {
        let node = this.getNode(nodeId);
        while (node) {
            if (node.id === ancestorId) {
                return true;
            }
            node = this.getNode(node.parentId);
        }
        return false;
    }

    static getRootNode(nodeId) {
        let node = this.getNode(nodeId);
        while (node && node.parentId) {
            node = this.getNode(node.parentId);
        }
        return node;
    }

    static canEdit(nodeId) {
        const rootOfNode = this.getRootNode(nodeId);
        const node = this.getNode(nodeId)
        let fisrtComponentAncestor = this.getNode(node.parentId);
        while (fisrtComponentAncestor && !(fisrtComponentAncestor instanceof ComponentNode)) {
            fisrtComponentAncestor = this.getNode(fisrtComponentAncestor.parentId);
        }

        return (rootOfNode == fisrtComponentAncestor) || fisrtComponentAncestor === null;
    }

    static printNodeTree(nodeId = null, level = 0) {
        if (nodeId === null) {
            // Print all root nodes
            for (const [id, node] of this.nodes) {
                if (!node.parentId) {
                    this.printNodeTree(id, level);
                }
            }
        } else {
            const node = this.getNode(nodeId);
            if (node) {
                console.log(' '.repeat(level * 2) + node.id + ' - ' + node.parentId);
                if (node.children) {
                    for (const childId of node.children) {
                        this.printNodeTree(childId, level + 1);
                    }
                }
            }
        }
    }
}
