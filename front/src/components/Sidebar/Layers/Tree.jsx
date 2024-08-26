import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {TreeNode} from "./TreeNode.jsx";

export const Tree = () => {
    const {project, actions} = useProject();

    if (!project) return null;

    return (
        <div className="ml-4">
            <TreeNode node={project.currentPage}/>
        </div>
    )
}