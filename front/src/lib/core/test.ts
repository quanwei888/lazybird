import {
    fetchNodeTypes, fetchProject,
    NodeManager, NodeType,
    NodeTypeManager,
    Project,
    PropsAttribute, syncProject
} from "./index.ts";

import 'reflect-metadata';

const projectId = 1;
const project = await fetchProject(projectId)
const nodeTypes = await fetchNodeTypes(projectId)
console.log(project);
project.currentPageId = "1_2"
//await syncProject(project);

const componentNodeType = NodeTypeManager.getNodeTypeByName("@Component");
const pageNodeType = NodeTypeManager.getNodeTypeByName("@Page");
const a = pageNodeType.createNode();
const b = componentNodeType.createNode();
NodeManager.insertNode(NodeTypeManager.getNodeTypeByName("@Stack").createNode().id,a.id);
console.log(a.children,b.children);
console.log(pageNodeType.createNode());
console.log(a.children,b.children);
//NodeManager.insertNode(Def.Stack.createNode().id, project.currentPageId);