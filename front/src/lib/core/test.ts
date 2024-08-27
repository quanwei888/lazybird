import {
    NodeManager,
    NodeTypeManager,
    Project,
    PropsAttribute
} from "./index.ts";
import * as Api from "@/api/api.ts"
import * as Def from "./Define.ts"


export const testProject: Project = new Project();
export const loadProject = (): Promise<Project> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testProject);
        }, 100); // 模拟 1 秒的网络延迟
    });
};

const page = Def.Stack.createNode();
testProject.pages.push(page);
testProject.currentPage = page;
testProject.pages.push(Def.Stack.createNode());
testProject.pages.push(Def.Stack.createNode());

NodeManager.insertNode(Def.Stack.createNode().id, page.id);
NodeManager.insertNode(Def.Label.createNode().id, page.id);
NodeManager.insertNode(Def.CardExample.createNode().id, page.id);
NodeManager.insertNode(Def.Component.createNode().id, page.id);
NodeManager.insertNode(Def.Label.createNode().id, page.id);

console.log(testProject)