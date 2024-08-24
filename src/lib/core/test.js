
export {NodeManager} from './Node/index.js';
import {UIStack, UIPage, UIComponent} from "./UI/index.js";

const page = UIPage.createNode();

NodeManager.insertNode(UIStack.createNode().id, page.id);
NodeManager.insertNode(UIStack.createNode().id, page.id);
NodeManager.insertNode(UIComponent.createNode().id, page.id);