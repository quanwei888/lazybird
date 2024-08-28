export type NodeType = {
    id: number;
    name: string;
    projectId: number;
    is_private: boolean;
    data: any;
    created_at: string;
    updated_at: string;
};

export type Project = {
    id: number;
    name: string;
    data: any;
    created_at: string;
    updated_at: string;
};

export type Message = {
    message: string;
};

export type NodeTypeCreate = Omit<NodeType, 'id' | 'created_at' | 'updated_at'>;
export type NodeTypeUpdate = Omit<NodeType, 'id' | 'created_at' | 'updated_at'>;

export type ProjectCreate = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Omit<Project, 'id' | 'created_at' | 'updated_at'>;


export type NodeTypesPublic = {
    data: NodeTypePublic[];
    count: number;
};

export type ProjectsPublic = {
    data: Project[];
    count: number;
};

export type ProjectPublic = Project;
export type NodeTypePublic = NodeType;
