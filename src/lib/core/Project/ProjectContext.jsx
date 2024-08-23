import React, {createContext, useContext, useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import _ from 'lodash';
import {loadProject} from "./TestProject.js";
import {NodeManager} from "../Node/index.js";
import {Project} from "@/core/Project/Project.js";

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
        reload: () => {
            const currentPageNode = NodeManager.getNode(project.currentPage.id);
            const updatedCurrentPage = {
                ...currentPageNode,
            };

            const updatedProject = new Project(project.id, project.name);
            updatedProject.pages = project.pages;
            updatedProject.components = project.components;
            updatedProject.currentPage = currentPageNode;
            updatedProject.currentComponent = project.currentComponent;
            updatedProject.selectedId = project.selectedId;
            updatedProject.overId = project.overId;
            updatedProject.draggingId = project.draggingId;
            updatedProject.nodes = Object.keys(NodeManager.nodes).length;


            setProject(updatedProject);
        },
    };

    return (
        <ProjectContext.Provider value={{project, ...actions}}>
            {children}
        </ProjectContext.Provider>
    );
}

// 自定义 Hook
export const useProject = () => {
    return useContext(ProjectContext);
}