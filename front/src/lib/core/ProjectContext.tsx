import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {useQuery} from "@tanstack/react-query";
import * as Core from "./node.ts";
import "./test.ts";
import {NodeType, Design, setNodeProps} from "./node.ts";
import _ from 'lodash';

export interface DragItem {
    id: string,
    type: string,
    width: number,
    height: number
}

export interface DropItem {
    id: string,
    pos?: number,
}

type EditMode = 'Page' | 'NodeType';

export interface State {
    dragItem?: DragItem;
    dropItem?: DropItem;
    editMode: EditMode;
    seletecedNodeId?: string;
}

interface ProjectContextType {
    state: State | null;
    actions: {
        startDrag: (dragItem: DragItem) => void;
        endDrag: () => void;
        startHover: (dropItem: DropItem) => void;
        endHover: () => void;
        addPage: (pageId: string) => void;
        delPage: (pageId: string) => void;
        addComponent: (componentId: string) => void;
        delComponent: (componentId: string) => void;
        editDesign: (designId: string) => void;
        selectNode: (nodeId: string) => void;
        setNodeProps: (nodeId: string, name: string, value: any) => void;
    };
}

// 定义 Context
export const ProjectContext = createContext<ProjectContextType | null>(null);

interface ProjectProviderProps {
    children: ReactNode;
}

// 创建 Provider 组件
export const ProjectProvider: React.FC<ProjectProviderProps> = ({children}) => {
    const [state, setState] = useState<State | null>(null);

    const {data} = useQuery({
        queryKey: ['loadProject'],
        queryFn: () => {
            const data: State = {
                editMode: "Page",
            };
            return data; // Return the data directly
        },
    });

    useEffect(() => {
        if (data) {
            console.log('load data ', data);
            setState(data);
        }
    }, [data]); // Add dependency array

    if (!state) return null;

    const actions = {
        startDrag(dragItem: DragItem) {
            setState({...state, dragItem});
        },
        endDrag() {
            setState({...state, dragItem: undefined});
        },
        startHover(dropItem: DropItem) {
            if (!_.isEqual(state.dropItem, dropItem)) {
                setState({...state, dropItem});
            }
        },
        endHover() {
            setState({...state, dropItem: undefined});
        },
        addPage(pageId: string) {
            Core.addPage(pageId)
            setState({...state});
        },
        delPage(pageId: string) {
            Core.delPage(pageId);
            setState({...state});
        },
        addComponent(componentId: string) {
            Core.addComponent(componentId);
            setState({...state});
        },
        delComponent(componentId: string) {
            Core.delComponent(componentId);
            setState({...state});
        },
        editDesign(designId: string) {
            Core.switchDesign(designId);
            setState({...state, editMode: "Page"});
        },
        selectNode(nodeId: string) {
            setState({...state, seletecedNodeId: nodeId});
        },
        setNodeProps(nodeId: string, name: string, value: any) {
            Core.setNodeProps(nodeId, name, value);
            setState({...state});
        }
    };

    return (
        <ProjectContext.Provider value={{state, actions}}>
            {children}
        </ProjectContext.Provider>
    );
}

// 自定义 Hook
export const useProject = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (context === null) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}

