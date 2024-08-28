import {NodeType} from "./NodeType.ts";


export class NodeTypeManager {
    static nodeTypes: Record<number, NodeType> = {};

    static addNodeType(nodeType: NodeType): void {
        this.nodeTypes[nodeType.id] = nodeType;
    }

    static getNodeTypes(): Record<number, NodeType> {
        return this.nodeTypes;
    }

    static getNodeTypeByName(name: string): NodeType {
        for (const nodeType of Object.values(this.nodeTypes)) {
            if (nodeType.name === name) {
                return nodeType;
            }
        }
        throw new Error(`Cannot get node type "${name}"`);
    }

    static getNodeType(id: number): NodeType {
        const node = this.nodeTypes[id];
        if (!node) {
            throw new Error(`Node type with id ${id} does not exist.`)
        }
        return node;
    }
}