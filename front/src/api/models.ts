export type Attribute = {
    id: number;
    uuid: string;
    name: string;
    value: Record<string, any>;
    node_type_id: number;
};

export type NodeType = {
    id: number;
    uuid: string;
    name: string;
    projectId: number;
    is_private: boolean;
    option: Record<string, any>;
    attribute_ids: number[];
};

export type Project = {
    id: number;
    uuid: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
};

export type Message = {
    message: string;
};

export type AttributeCreate = Omit<Attribute, 'id'>;
export type AttributeUpdate = Partial<Attribute>;

export type NodeTypeCreate = Omit<NodeType, 'id'>;
export type NodeTypeUpdate = Partial<NodeType>;

export type ProjectCreate = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<Project>;

export type AttributesPublic = {
    data: Attribute[];
    count: number;
};

export type NodeTypesPublic = {
    data: NodeType[];
    count: number;
};

export type ProjectsPublic = {
    data: Project[];
    count: number;
};

export type ProjectPublic = Project;
export type AttributePublic = Attribute;
export type NodeTypePublic = NodeType;
