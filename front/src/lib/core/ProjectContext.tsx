import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {useQuery} from "@tanstack/react-query";
import {loadProject} from "./test.ts";
import {NodeManager, Project} from "./index.ts";
import _ from 'lodash';

interface ProjectContextProps {
    project: Project | null;
    actions: {
        setCurrentDrop: (drop: any) => void;
        setCurrentDrag: (drag: any) => void;
        setCurrentPageId: (id: string | null) => void;
        setSelectedId: (id: string | null) => void;
        reload: () => void;
    };
}

// 定义 Context
export const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

interface ProjectProviderProps {
    children: ReactNode;
}

// 创建 Provider 组件
export const ProjectProvider: React.FC<ProjectProviderProps> = ({children}) => {
    const [project, setProject] = useState<Project | null>(null);

    const {data, isLoading} = useQuery({
        queryKey: ['loadProject'],
        queryFn: () => loadProject(),
    });

    useEffect(() => {
        if (data) {
            setProject(data);
        }
    }, [data]);

    const actions = {
        setCurrentDrop(drop: any) {
            if (!_.isEqual(drop, project?.currentDrop)) {
                if (project) {
                    project.currentDrop = drop;
                    this.reload();
                }
            }
        },
        setCurrentDrag(drag: any) {
            if (project) {
                project.currentDrag = drag;
                this.reload();
            }
        },
        setCurrentPageId(id: string | null) {
            if (project && id !== project.currentPage?.id) {
                project.currentPage = NodeManager.getNode(id);
                project.selectedId = null;
                this.reload();
            }
        },
        setSelectedId(id: string | null) {
            if (project && id !== project.selectedId) {
                project.selectedId = id;
                this.reload();
            }
        },
        reload: () => {
            if (project) {
                const currentPageNode = NodeManager.getNode(project.currentPage?.id);
                const updatedCurrentPage = {
                    ...currentPageNode,
                };

                const newProject = new Project({id: project.id, name: project.name});
                for (const key in project) {
                    (newProject as any)[key] = (project as any)[key];
                }
                setProject(newProject);
            }
        },
    };

    return (
        <ProjectContext.Provider value={{project, actions}}>
            {children}
        </ProjectContext.Provider>
    );
}

// 自定义 Hook
export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}