import {Node} from "./Node";
import * as Api from "../../api/api.ts";
import {PlainBase} from "../utils.ts";
import {NodeType} from "./NodeType.ts";
import {Attribute} from "./Attribute.ts";
import {NodeTypeManager} from "./NodeTypeManager.ts";
import {NodeManager} from "./NodeManager.ts";

interface ProjectConstructor {
    id?: number;
    name?: string;
}

export class Project {
    id: number;
    name: string;
    pages: any[];
    components: any[];
    nodes: any[];
    currentPageId: any | null;
    currentComponent: any | null;
    selectedId: any | null;
    currentDrop: any | null;
    currentDrag: any | null;

    constructor({id = 0, name = ""}: ProjectConstructor = {}) {
        this.id = id;
        this.name = name;
        this.pages = [];
        this.components = [];
        this.nodes = [];
        this.currentPageId = null;
        this.currentComponent = null;
        this.selectedId = null;
        this.currentDrop = null; // { id: null, index: null }
        this.currentDrag = null; // { id: null, width: null, height: null }
    }
}

export const syncProject = async (project: Project): Promise<void> => {
    const {id,currentDrag,currentDrop,selectedId, ...projectData} = project;
    projectData.nodes = [];
    projectData.pages.forEach((pageNodeId) => {
        NodeManager.getTreeNodes(pageNodeId).forEach((node) => {
            projectData.nodes.push(node);
        });
    });

    const response = await Api.updateProject(id, {
        name: project.name,
        data: projectData,
    });
    console.log(response);
}
export const fetchProject = async (id: number): Promise<Project> => {
    const projectData = await Api.getProjectById(id);
    console.log("fetchProject");
    const nodeTypeData = await Api.getNodeTypeByProjectId(id);
    console.log(nodeTypeData);

    const project = new Project();
    Object.assign(project, projectData.data);
    project.id = projectData.id;

    const nodes = [];
    NodeManager.nodes = {};
    for (const nodeData of project.nodes) {
        const node = PlainBase.instance(nodeData) as Node;
        nodes.push(node);
        NodeManager.addNode(node);
    }
    project.nodes = nodes;
    console.log("Project 111", project.nodes);

    return project;
};

export const fetchNodeTypes = async (id: number): Promise<NodeType[]> => {
    console.log("fetchNodeTypes");
    const nodeTypeDatas = await Api.getNodeTypeByProjectId(id)
    //console.log(nodeTypeDatas)

    const nodeTypes = []
    for (const row of nodeTypeDatas.data) {
        const {attributes: attributesData, ...nodeTypeData} = row.data;
        const nodeType = PlainBase.instance(nodeTypeData) as NodeType;
        nodeType.id = row.id;

        Object.keys(attributesData).forEach(attrId => {
            const attribute = PlainBase.instance(attributesData[attrId]) as Attribute;
            nodeType.addAttribute(attrId, attribute);
        });
        nodeTypes.push(nodeType);
    }

    NodeTypeManager.nodeTypes = {};
    nodeTypes.forEach(nodeType => {
        NodeTypeManager.addNodeType(nodeType);
    });

    return nodeTypes;
}