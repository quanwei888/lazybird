import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {NodeManager} from "@/lib/core/index.js";
import {useState} from "react";
import {ChevronRight, ChevronDown} from 'lucide-react'

export const TreeNode = ({node, level}) => {
    const {project, actions} = useProject();
    const [isExpanded, setIsExpanded] = useState(false)
    const hasChildren = node.children && node.children.length > 0

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="ml-2">
            <div className="flex items-center py-1 text-sm">
                <button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-6"
                    onClick={toggleExpand}
                >
                    {hasChildren && (isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>)}
                </button>
                <span className="cursor-default">{node.id}</span>
            </div>
            {isExpanded && hasChildren && (
                <div className="ml-0">
                    {node.children.map((childId) => (
                        <TreeNode key={childId} node={NodeManager.getNode(childId)} level={level + 1}/>
                    ))}
                </div>
            )}
        </div>
    )
}