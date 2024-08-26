import React, {createContext, useContext, useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {loadProject} from "./TestProject.js";
import {NodeManager} from "../Node/index.js";
import {Project} from "./Project.js";
import _ from "lodash";

// 定义 Context
export const ProjectContext = createContext();

// 创建 Provider 组件
export const ProjectProvider = ({children}) => {
    const [project, setProject] = useState(null);

    const {data, isLoading: isLoadingPage} = useQuery({
        queryKey: ['loadProject'],
        queryFn: () => loadProject(),
    });
    useEffect(() => {
        if (data) {
            setProject(data);
        }
    }, [data]);

    const actions = {
        setCurrentDrop(drop) {
            if (!_.isEqual(drop, project.currentDrop)) {
                //console.log('555,setCurrentDrop OK', drop.id);
                project.currentDrop = drop;
                this.reload();
            }
        },
        setCurrentPageId(id) {
            if (id !== project.currentPage.id) {
                project.currentPage = NodeManager.getNode(id);
                project.selectedId = null;
                this.reload();
            }
        },
        setSelectedId(id) {
            if (id !== project.selectedId) {
                project.selectedId = id;
                this.reload();
            }
        },
        setDraggingId(id) {
            if (id !== project.draggingId) {
                project.draggingId = id;
                this.reload();
            }
        },
        reload: () => {
            const currentPageNode = NodeManager.getNode(project.currentPage.id);
            const updatedCurrentPage = {
                ...currentPageNode,
            };

            const newProject = new Project(project.id, project.name);
            for (const key in project) {
                if (project.hasOwnProperty(key)) {
                    newProject[key] = project[key];
                }
            }
            setProject(newProject);
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
    return useContext(ProjectContext);
}