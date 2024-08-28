import {Node, ComponentNode} from "./Node.js";


export class NodeManager {
    static nodes: Record<string, Node> = {};

    static getNodes(): Record<string, Node> {
        return this.nodes;
    }

    static addNode(node: Node): void {
        this.nodes[node.id] = node;
    }

    static insertNode(nodeId: string, parentId: string, position: number | null = null): void {
        const node = this.getNode(nodeId);
        if (!node) {
            throw new Error(`Node with id ${nodeId} is not defined.`);
        }

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
                    oldParentNode.children = oldParentNode.children?.filter((childId: any) => childId !== node.id) || [];
                }
            }

            // 检查节点是否已经是新的父节点的子节点
            const existingChildIndex = parentNode.children?.indexOf(node.id) ?? -1;
            if (existingChildIndex !== -1) {
                // 如果是新的父节点的子节点，先从新的父节点删除
                parentNode.children?.splice(existingChildIndex, 1);
            }
        } else {
            // 如果没有提供父节点ID，抛出错误
            throw new Error(`Parent node id is not defined.`);
        }

        // 作为新节点插入
        node.parentId = parentId;
        const parentNode = this.getNode(parentId);
        if (parentNode) {
            // 将新节点插入到父节点的子节点列表中的指定位置
            this.insertAtPosition(parentNode.children, node.id, position);
        }
    }

    static insertAtPosition(children: string[], nodeId: string, position: number | null): void {
        if (position === null || position < 0 || position >= children.length) {
            children.push(nodeId);
        } else {
            children.splice(position, 0, nodeId);
        }
    }

    static getNode(id: string): Node {
        const node = this.nodes[id];
        if (!node) {
            throw new Error(`Node with id ${id} is not defined.`);
        }
        return node;
    }

    static exists(id: string): boolean {
        return id in this.nodes;
    }

    static removeNode(id: string): void {

        const node = this.getNode(id);
        if (node.parentId) {
            const parentNode = this.getNode(node.parentId);
            parentNode.children = parentNode.children?.filter((childId: string) => childId !== id) || [];
        }
        delete this.nodes[id];
    }

    static isAncestor(ancestorUuid: string, nodeId: string): boolean {
        let node = this.getNode(nodeId);
        while (node) {
            if (node.id === ancestorUuid) {
                return true;
            }
            if (!node.parentId) {
                break;
            }
            node = this.getNode(node.parentId!);
        }
        return false;
    }

    static getRootNode(nodeId: string): Node | undefined {
        let node = this.getNode(nodeId);
        while (node && node.parentId) {
            node = this.getNode(node.parentId);
        }
        return node;
    }

    static canEdit(nodeId: string): boolean {
        const node = this.getNode(nodeId);
        if (!node.parentId) return true;
        return this.canEditChildren(node.parentId!);
    }

    static canEditChildren(nodeId: string): boolean {
        const node = this.getNode(nodeId);
        if (!node.parentId) return true;
        if (node instanceof ComponentNode) {
            // 非根节点的组件节点不能编辑子节点
            return false;
        }
        return this.canEditChildren(node.parentId!);
    }

    static getTreeNodes(nodeId: string): Node[] {
        const result: Node[] = [];
        const traverse = (id: string) => {
            const node = this.getNode(id);
            if (node) {
                result.push(node);
                if (node.children) {
                    for (const childId of node.children) {
                        traverse(childId);
                    }
                }
            }
        };
        traverse(nodeId);
        return result;
    }

    static printNodeTree(nodeId: string | null = null, level = 0): void {
        if (nodeId === null) {
            // Print all root nodes
            for (const [id, node] of Object.entries(this.nodes)) {
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
