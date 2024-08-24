import {Project} from "./Project.js";
import {UIStack, UIPage, UIComponent} from "../UI/index.js";

import {
    NodeManager,
    NodeTypeManager,
    AttributeManager,
    StyleAttribute,
    BackgroundAttribute, ColorAttribute, Attribute
} from "../index.js";


export const testProject = new Project();
export const loadProject = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testProject);
        }, 100); // 模拟 1 秒的网络延迟
    });
};

const page = UIPage.createNode();
testProject.pages.push(page);
testProject.currentPage = page;

NodeManager.insertNode(UIStack.createNode().id, page.id);
NodeManager.insertNode(UIStack.createNode().id, page.id);

const component = UIComponent.createNode();
console.log(component);
NodeManager.insertNode(component.id, page.id);
NodeManager.printNodeTree(page.id);
/*
const cardType = NodeTypeManager.getNodeType("UICard")
const card = cardType.createNode();
NodeManager.insertNode(cardType.createNode({card_title: "Card 1"}).id, page.id);
NodeManager.insertNode(cardType.createNode({card_title: "Card 2"}).id, page.id);

//const child2 = NodeTypeManager.getNodeType("Label").createNode();
NodeManager.insertNode(NodeTypeManager.getNodeType("Stack").createNode().id, page.id);
NodeManager.insertNode(NodeTypeManager.getNodeType("Component").createNode().id, page.id);
*/