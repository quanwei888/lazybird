import {useProject} from "@/lib/core/ProjectContext";
import {NodeManager, Node} from "@/lib/core";
import {useState} from "react";
import {ChevronRight, ChevronDown} from 'lucide-react';

interface TreeNodeProps {
    node?: Node;
    level?: number;
}

export const TreeNode: React.FC<TreeNodeProps> = ({node, level = 0}) => {
    const {project, actions} = useProject();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!node) return null;
    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="ml-2">
            <div className="flex items-center py-1 text-sm">
                <button
                    className="h-4 w-6"
                    onClick={toggleExpand}
                >
                    {hasChildren && (isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>)}
                </button>
                <span className="cursor-default">{node.id}</span>
            </div>
            {isExpanded && hasChildren && (
                <div className="ml-0">
                    {node?.children?.map((childId) => (
                        <TreeNode key={childId} node={NodeManager.getNode(childId)} level={level + 1}/>
                    ))}
                </div>
            )}
        </div>
    );
};