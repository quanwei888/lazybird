import {
    Project,
} from "./index.ts";
import * as Api from "../../api/api.ts"
import {SystemNodeTypes} from "./Define.ts";

const project = new Project({name: "Project 1"});
const {id, ...projectData} = project;
const response = await Api.createProject({
    name: project.name,
    data: projectData,
});
const projectId = response.id;
console.log(response);
SystemNodeTypes.forEach(async (nodeType) => {
    const {id, ...nodeTypeData} = nodeType;
    const response = await Api.createNodeType({
        name: nodeType.name,
        project_id: 0,
        is_private: false,
        data: nodeTypeData,
    });
    console.log(response)
})