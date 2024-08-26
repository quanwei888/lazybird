import {Project} from "./Project.js";
import {Stack,Label, Component,CardExample} from "../UI/index.js";

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

console.log(NodeManager.canEdit("Component_11"));
const component = Component.createNode();
NodeManager.printNodeTree(page.id);
const nodeTypes = NodeTypeManager.getNodeTypes();
console.log(Object.keys(nodeTypes));