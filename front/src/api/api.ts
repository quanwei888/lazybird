import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:9000', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attribute APIs
export const getAttributes = async (skip: number = 0, limit: number = 100): Promise<any> => {
    const response = await apiClient.get(`/attribute/?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getAttributeById = async (id: number): Promise<any> => {
    const response = await apiClient.get(`/attribute/${id}`);
    return response.data;
};

export const createAttribute = async (attributeData: any): Promise<any> => {
    const response = await apiClient.post('/attribute/', attributeData);
    return response.data;
};

export const updateAttribute = async (id: number, attributeData: any): Promise<any> => {
    const response = await apiClient.put(`/attribute/${id}`, attributeData);
    return response.data;
};

export const deleteAttribute = async (id: number): Promise<any> => {
    const response = await apiClient.delete(`/attribute/${id}`);
    return response.data;
};

// NodeType APIs
export const getNodeTypes = async (skip: number = 0, limit: number = 100): Promise<any> => {
    const response = await apiClient.get(`/node_type/?skip=${skip}&limit=${limit}`);
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

// Project APIs
export const getProjects = async (skip: number = 0, limit: number = 100): Promise<any> => {
    const response = await apiClient.get(`/project/?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getProjectById = async (id: number): Promise<any> => {
    const response = await apiClient.get(`/project/${id}`);
    return response.data;
};

export const createProject = async (projectData: any): Promise<any> => {
    const response = await apiClient.post('/project/', projectData);
    return response.data;
};

export const updateProject = async (id: number, projectData: any): Promise<any> => {
    const response = await apiClient.put(`/project/${id}`, projectData);
    return response.data;
};

export const deleteProject = async (id: number): Promise<any> => {
    const response = await apiClient.delete(`/project/${id}`);
    return response.data;
};
