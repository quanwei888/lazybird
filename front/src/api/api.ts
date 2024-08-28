import axios from 'axios';
import {NodeTypesPublic, ProjectCreate, ProjectPublic, ProjectUpdate} from "@/api/models.ts";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:9000', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getNodeTypeByProjectId = async (projectId: number): Promise<NodeTypesPublic> => {
    const response = await apiClient.get(`/node_type/project_node_type/${projectId}`);
    return response.data;
};

export const getNodeTypeById = async (id: number): Promise<any> => {
    const response = await apiClient.get(`/node_type/${id}`);
    return response.data;
};

export const createNodeType = async (nodeTypeData: any): Promise<any> => {
    const response = await apiClient.post('/node_type/', nodeTypeData);
    return response.data;
};

export const updateNodeType = async (id: number, nodeTypeData: any): Promise<any> => {
    const response = await apiClient.put(`/node_type/${id}`, nodeTypeData);
    return response.data;
};

export const deleteNodeType = async (id: number): Promise<any> => {
    const response = await apiClient.delete(`/node_type/${id}`);
    return response.data;
};


export const getProjectById = async (id: number): Promise<ProjectPublic> => {
    const response = await apiClient.get(`/project/${id}`);
    return response.data;
};

export const createProject = async (projectData: ProjectCreate): Promise<ProjectPublic> => {
    const response = await apiClient.post('/project/', projectData);
    return response.data;
};

export const updateProject = async (id: number, projectData: ProjectUpdate): Promise<ProjectPublic> => {
    const response = await apiClient.put(`/project/${id}`, projectData);
    return response.data;
};

export const deleteProject = async (id: number): Promise<any> => {
    const response = await apiClient.delete(`/project/${id}`);
    return response.data;
};
