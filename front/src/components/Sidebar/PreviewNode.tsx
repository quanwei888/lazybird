import {Node, NodeManager} from "@/lib/core";
import {useProject} from "@/lib/core/ProjectContext";
import RenderNode from "@/components/Canvas/RenderNode";

interface PreviewNodeProps {
    node: Node;
}

export const PreviewNode: React.FC<PreviewNodeProps> = ({node}) => {
    return (
        <RenderNode node={node}>
            {node.children.map((childId) => (
                <PreviewNode key={childId} node={NodeManager.getNode(childId)}/>
            ))}
        </RenderNode>
    );
};