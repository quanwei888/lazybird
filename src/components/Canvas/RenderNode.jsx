import React, {forwardRef} from 'react';
import {
    StyleAttribute,
    Attribute,
    NodeTypeManager,
    NodeManager
} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import log from 'loglevel';
import {UICard} from "@/components/Canvas/ui/UICard.jsx";
import {UIComponent} from "@/components/Canvas/ui/UIComponent.jsx";

const RenderNode = forwardRef(({children, node}, ref) => {
    const {project, reload} = useProject();

    log.debug(`[Render][RenderNode.${node.id}][${node.nodeTypeId}]`);

    const classNames = [];
    classNames.push('selectable')
    const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);

    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        if (attribute instanceof StyleAttribute) {
            classNames.push(attribute.getClassName(node.attributes[attrKey]));
        }
    });

    const props = {}
    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        //log.debug("attribute", attribute);
        if (attribute.option.type !== "props") {
            return;
        }
        if (attribute instanceof Attribute) {
            props[attribute.name] = node.attributes[attrKey];
        }
    });

    if (node.id == project.draggingId) {
        classNames.push('opacity-50 outline-none')
    }

    //log.debug("props", node,props);

    if (nodeType.option.render == "UIStack") {
        const className = classNames.join(" ") + " p-5 border";
        return (
            <div ref={ref} id={node.id} className={className}>
                {node.id}
                {children}
            </div>
        )
    }
    if (nodeType.option.render == " UICard") {
        return (
            <UICard ref={ref} id={node.id} className={classNames.join(" ")} {...props} />
        )
    }
    if (nodeType.option.render == "UIComponent") {
        const rootNode = NodeManager.getNode(node.children[0]);
        console.log("UIComponent1111", rootNode);
        classNames.push('border p-4')

        return (
            <UIComponent ref={ref} id={node.id} node={rootNode} className={classNames.join(" ")} {...props}/>
        )
    }


    if (node.nodeTypeId === " Page") {
        return (
            <div ref={ref} id={node.id} className={classNames.join(" ")}>
                {node.id}
                {children}
            </div>
        )
    }
    if (node.nodeTypeId === " Stack") {
        return (
            <div ref={ref} id={node.id} className={classNames.join(" ")}>
                {node.id}
                {children}
            </div>
        )
    }
    if (node.nodeTypeId === " Label") {
        return (
            <span ref={ref} id={node.id} className={classNames.join(" ")}>
                {node.attributes.text}
            </span>
        )
    }
    if (node.nodeTypeId === " Button") {
        return (
            <button ref={ref} id={node.id} className={classNames.join(" ")}>
                {node.attributes.text}
            </button>
        )
    }

})

export default RenderNode;