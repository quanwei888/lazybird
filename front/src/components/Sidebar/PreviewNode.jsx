import React, {forwardRef, useEffect, useRef, useState} from "react";
import {NodeManager} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import RenderNode from "@/components/Canvas/RenderNode.jsx";

export const PreviewNode = ({node}) => {
    const {project, actions} = useProject();

    return (
        <RenderNode node={node}>
            {node.children.map((childId, index) => (
                <PreviewNode key={childId} node={NodeManager.getNode(childId)}/>
            ))}
        </RenderNode>
    )
}