import {v4 as uuidv4} from 'uuid';
import {
    LabelNodeType,
    StackNodeType,
    SlotNodeType,
    ComponentNodeTypeExample
} from "./define.ts"

// 节点类型接口，定义了节点的基本属性
export interface NodeType {
    id: string; // 节点类型ID
    render: string; // 渲染方式
    defaultProps: Record<string, any>; // 默认属性
    defaultChildren: Node[]; // 默认子节点树
}

// 节点接口，定义了节点的基本结构
export interface Node {
    id: string; // 节点ID
    type: string; // 节点类型
    name: string; // 节点名称
    parentId: string | null; // 父节点ID
    props: Record<string, any>; // 节点属性
    children: string[]; // 子节点ID数组
}

// 页面接口，定义了页面的基本结构
export interface Design {
    id: string; // 页面ID
    rootId: string | null; // 根节点ID
    type: string;
    nodeType?: NodeType; // 节点类型
}

// 项目接口，定义了项目的基本结构
export interface Project {
    id: string; // 项目ID
    pages: Design[]; // 页面数组
    components: Design[]; // 节点类型集合
    nodeTypes: Record<string, NodeType>; // 节点类型集合
    nodes: Record<string, Node>; // 节点集合
    currentDesign: Design | null; // 当前页面
}

// 初始化项目对象
export const project: Project = {
    id: "default",
    pages: [],
    components: [],
    nodes: {},
    nodeTypes: {
        [StackNodeType.id]: StackNodeType,
        [LabelNodeType.id]: LabelNodeType,
        [SlotNodeType.id]: SlotNodeType,
    },
    currentDesign: null,
}

// 节点操作函数
let ID = 1;

export const createNode = (nodeType: NodeType, props: Record<string, any> = {}): Node => {
    const node: Node = {
        id: nodeType.id + "-" + ID++,
        parentId: null,
        name: nodeType.id,
        type: nodeType.id,
        children: [],
        props: {},
    }

    Object.keys(nodeType.defaultProps).forEach(key => {
        node.props[key] = props[key] ?? nodeType.defaultProps[key];
    })

    const children = copyNode(nodeType.defaultChildren);
    children.forEach(child => {
        addNode(child)
    });
    children.forEach(child => {
        insertNode(child, node);
    })
    addNode(node);
    return node;
}

const copyNode = (nodes: Node[]): Node[] => {
    const idMap: Record<string, string> = {};
    const copiedNodes: Node[] = [];

    nodes.forEach(node => {
        idMap[node.id] = node.type + "-" + ID++;
    });

    nodes.forEach(node => {
        const newNode: Node = {
            ...node,
            id: idMap[node.id],
            parentId: node.parentId ? idMap[node.parentId] : null,
            children: node.children.map(childId => idMap[childId]),
        };
        copiedNodes.push(newNode);
    });

    return copiedNodes;
}

export const addNode = (node: Node) => {
    project.nodes[node.id] = node;

    const currentDesign = project.currentDesign;
}

export const setNodeProps =
    (id: string, name: string, value: any) => {
        const node = getNode(id);
        node.props[name] = value;
    }
export const updateComponent = () => {
    const currentDesign = project.currentDesign;
    if (!currentDesign || currentDesign.type === "Page") {
        return;
    }
    const node = getNode(currentDesign.rootId!);
    const nodeType = currentDesign.nodeType!;
    const defaultChildren = getAllNodes(node)
    nodeType.defaultChildren = defaultChildren;
    console.log(defaultChildren);
}

export const delNode = (node: Node) => {
    if (node.parentId) {
        const parentNode = getNode(node.parentId);
        if (parentNode) {
            const index = parentNode.children.indexOf(node.id);
            if (index > -1) {
                parentNode.children.splice(index, 1);
            }
        }
    }
    delete project.nodes[node.id];
}

export const insertNode = (node: Node, parentNode: Node, position = -1) => {
    if (!node) {
        throw new Error("Node not found");
    }

    if (node.parentId) {
        const parentNode = getNode(node.parentId);
        const index = parentNode.children.indexOf(node.id);
        if (index > -1) {
            parentNode.children.splice(index, 1);
        }
    }

    if (!parentNode) {
        throw new Error("Parent node not found");
    }

    if (position !== undefined) {
        parentNode.children.splice(position, 0, node.id);
    } else {
        parentNode.children.push(node.id);
    }
    node.parentId = parentNode.id;
    updateComponent();
}

// 页面操作函数
export const switchDesign = (designId: string) => {
    let design: any = project.pages.find(page => page.id === designId);
    if (!design) {
        design = project.components.find(component => component.id === designId);
    }

    project.pages.find(page => page.id === designId);
    project.currentDesign = design;
}

export const getPage = (id: string): Design | null => {
    return project.pages.find(page => page.id === id) || null;
}

export const addPage = (pageId: string) => {
    const node = createNode(StackNodeType);
    const page: Design = {
        id: pageId,
        rootId: node.id,
        type: "Page",
    };
    project.pages.push(page);
    switchDesign(page.id);
}

export const delPage = (pageId: string) => {
    const page = getPage(pageId);
    project.pages = project.pages.filter(p => p.id !== page?.id);
}

export const addComponent = (componentId: string) => {
    const rootNode = createNode(StackNodeType);
    const nodeType: NodeType = {
        ...ComponentNodeTypeExample,
        id: componentId,
        defaultChildren: [rootNode],
    }
    project.nodeTypes[componentId] = nodeType;
    const component: Design = {
        id: componentId,
        rootId: rootNode.id,
        type: "Component",
        nodeType: nodeType
    }
    project.components.push(component);
    switchDesign(component.id);
    console.log(project.currentDesign)
}

export const delComponent = (componentId: string) => {
    const component = project.components.find(c => c.id === componentId);
    if (component && component.type === "Component") {
        project.nodeTypes[component.nodeType!.id]
        project.components = project.components.filter(c => c !== component);
    }
}

// 节点类型操作函数
export const getNodeType = (id: string): NodeType => {
    return project.nodeTypes[id];
}

export const getNodeTypeByNode = (node: Node): NodeType => {
    const nodeType = getNodeType(node.type);
    if (!nodeType) {
        throw new Error("Node type not found");
    }
    return nodeType;
}


// 节点编辑权限函数
export const canEdit = (node: Node): boolean => {
    if (!node) {
        throw new Error("Node not found");
    }

    if (!node.parentId) {
        return true;
    }

    const nodeType = getNodeType(node.type);
    if (!nodeType) {
        throw new Error("Node type not found");
    }

    if (nodeType.id === "Slot") {
        return true;
    }

    let isSelfEditable = true;
    if (node.parentId) {
        const parentNode = getNode(node.parentId);
        const parentNodeType = getNodeType(parentNode.type);
        if (parentNodeType.render === "ComponentRender") {
            isSelfEditable = false;
        }
    }

    return isSelfEditable && canEdit(getNode(node.parentId!));
}

export const canEditChildren = (node: Node): boolean => {
    if (!canEdit(node)) {
        return false;
    }

    const nodeType = getNodeType(node.type);
    if (nodeType.render === "ComponentRender" && node.parentId) {
        return false;
    }
    if (nodeType.id === "Slot") {
        return true;
    }

    return true;
}

export const canDragNode = (node: Node): boolean => {
    if (!node) {
        throw new Error("Node not found");
    }

    if (!node.parentId) {
        return false;
    }

    const parentNode = getNode(node.parentId);
    return canEdit(node) && canEditChildren(parentNode);
}

export const canDropNode = (node: Node | undefined, targetNode: Node): boolean => {
    if (!targetNode) {
        throw new Error("Target node not found");
    }

    if (node?.id === targetNode.id || node?.id && isAncestor(node, targetNode)) {
        return false;
    }

    const targetNodeType = getNodeType(targetNode.type);
    if (!targetNodeType) {
        throw new Error("Target node type not found");
    }

    const allowedRenders = ["StackRender", "SlotRender", "ComponentRender"];
    if (!allowedRenders.includes(targetNodeType.render)) {
        return false;
    }

    return canEdit(targetNode) && canEditChildren(targetNode);
}

// 节点查找函数
export const findFirstEditableNode = (node: Node): Node | undefined => {
    let pnode: any = node;
    while (pnode && !canEdit(pnode)) {
        pnode = pnode.parentId ? getNode(pnode.parentId) : undefined;
    }
    return node;
}

export const findFirstDropableNode = (node: Node | undefined, targetNode: Node): Node | undefined => {
    let pnode: any = targetNode;
    while (pnode && !canDropNode(node, pnode)) {
        pnode = pnode.parentId ? getNode(pnode.parentId) : undefined;
    }
    return pnode;
}

export const getRootNode = (): Node => {
    if (!project.currentDesign?.rootId) {
        throw new Error("No root id for page");
    }
    return project.nodes[project.currentDesign.rootId];
}

export const getNode = (id: string): Node => {
    return project.nodes[id];
}
export const getAllNodes = (rootNode: Node): Node[] => {
    const nodes: Node[] = [];

    const traverse = (node: Node) => {
        nodes.push(node);
        node.children.forEach(childId => {
            const childNode = getNode(childId);
            traverse(childNode);
        });
    };

    traverse(rootNode);
    return nodes;
}

export const getDirection = (node: Node): string => {
    if (!node.props.css?.layout) return "y";
    return node.props.css?.layout?.direction.includes("row") ? "x" : "y";

}

// 其他辅助函数
export const isAncestor = (ancestorNode: Node, node: Node): boolean => {
    if (!node) {
        throw new Error("Node not found");
    }

    let currentNode = node;
    while (currentNode.parentId) {
        if (currentNode.parentId === ancestorNode.id) {
            return true;
        }
        currentNode = getNode(currentNode.parentId);
        if (!currentNode) {
            break;
        }
    }

    return false;
}

export const printTree = (node: Node, depth = 0) => {
    console.log(' '.repeat(depth * 2) + node.id);
    if (node.children) {
        node.children.forEach(childId => {
            const childNode = getNode(childId);
            printTree(childNode, depth + 1);
        });
    }
}
