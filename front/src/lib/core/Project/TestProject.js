import {Project} from "./Project.js";
import {Stack, Label, Component, CardExample} from "../UI/index.js";
import {Serializable} from "../utils.js";
import * as API from '../../../api/api.ts';
import {
    NodeManager, NodeTypeManager,
} from "../index.js";


export const testProject = new Project();
export const loadProject = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testProject);
        }, 100); // 模拟 1 秒的网络延迟
    });
};

const page = Stack.createNode();
testProject.pages.push(page);
testProject.currentPage = page;
testProject.pages.push(Stack.createNode());
testProject.pages.push(Stack.createNode());

NodeManager.insertNode(Stack.createNode().id, page.id);
NodeManager.insertNode(Stack.createNode().id, page.id);
NodeManager.insertNode(Label.createNode().id, page.id);
NodeManager.insertNode(CardExample.createNode().id, page.id);
NodeManager.insertNode(Component.createNode().id, page.id);
NodeManager.insertNode(Component.createNode().id, page.id);
NodeManager.insertNode(Label.createNode().id, page.id);
NodeManager.insertNode(Label.createNode().id, page.id);
NodeManager.insertNode(CardExample.createNode().id, page.id);
testProject.selectedId = "Stack_9";

//console.log(NodeManager.canEdit("Component_11"));
const component = Component.createNode();
//NodeManager.printNodeTree(page.id);
const nodeTypes = NodeTypeManager.getNodeTypes();
//console.log(Object.keys(nodeTypes));


const loadJson = () => {
    NodeManager.nodes.clear();
    NodeTypeManager.nodeTypes.clear();

    const json = localStorage.getItem('data');
    const data = JSON.parse(json);

    for (const nodeTypeObject of data["nodeTypes"]) {
        const nodeType = Serializable.fromJSON(nodeTypeObject)
        NodeTypeManager.addNodeType(nodeType);
    }

    for (const nodeObject of data["nodes"]) {
        const node = Serializable.fromJSON(nodeObject)
        NodeManager.addNode(node);
    }

    const project = new Project();

    for (const [id, node] of NodeManager.getNodes()) {
        if (node.parentId === null) {
            project.pages.push(node);
        }
    }
}

const syncJson = () => {
    const data = {
        nodeTypes: [],
        nodes: []
    }
    for (const [id, nodeType] of NodeTypeManager.getNodeTypes()) {
        const nodeTypeJson = nodeType.toJSON()
        data.nodeTypes.push(nodeTypeJson)
    }

    for (const [id, node] of NodeManager.getNodes()) {
        const nodeJson = node.toJSON();
        data.nodes.push(nodeJson);
    }

    localStorage.setItem('data', JSON.stringify(data));
}




let id = 1
const allAttributes = () => {
    const data = {}
    for (const [uuid, nodeType] of NodeTypeManager.getNodeTypes()) {
        const row = nodeType;
        row.type = row['_CLASS_'];
        row.uuid = row["id"];
        row.attribute_ids = []

        for (const attribute of nodeType.attributes) {
            row.attribute_ids.push(attribute.id);
        }
        delete row.attributes;
        row.id = id++;
        console.log(JSON.stringify(row,null,2));
    }
    return data;
}
allAttributes()