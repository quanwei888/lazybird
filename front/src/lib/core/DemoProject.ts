import {
    NodeManager, NodeType, NodeTypeManager,
    Project,
    fetchNodeTypes,
    fetchProject,
    syncProject
} from "./index.ts";
import * as Def from "./Define.ts"
import * as Api from "@/api/api.ts";
import {PlainBase} from "@/lib/utils.ts";

export const loadProject = async (): Promise<Project> => {
    const projectId = 1;
    const project = await fetchProject(projectId);
    const nodeTypes = await fetchNodeTypes(projectId);
    Object.keys(NodeManager.nodes).forEach(node => {
        console.log(NodeManager.getNode(node).nodeTypeId);
    })
    globalProject = project;
    console.log("Load Project Complete", project, nodeTypes);
    return project;
};

let globalProject: Project | null = null;


const syncInterval = setInterval(async () => {
    if (globalProject) {
        console.log("sync project");
        await syncProject(globalProject);
    }
}, 1000);

window.onerror = function (message, source, lineno, colno, error) {
    if (globalProject) {
        clearInterval(syncInterval);
        console.log("Error occurred, sync interval cleared:", message);
    }
    return false; // Let the error propagate
};
