import React from 'react';
import { useProject } from "@/lib/core/ProjectContext";
import { TreeNode } from "./TreeNode";

export const Tree: React.FC = () => {
    const { project, actions } = useProject();

    if (!project) return null;

    return (
        <div className="ml-4">
            <TreeNode node={project.currentPageId} />
        </div>
    );
}