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
    const {project} = useProject();
    const currentDrop = project.currentDrop || {id: null, index: null};

    log.debug(`[Render][RenderNode.${node.id}][${node.nodeTypeId}]`);

    // 初始化类名数组
    const classNames = ['relative'];
    if (NodeManager.canEdit(node.id)) {
        classNames.push('can-be-selected', 'can-be-hovered');
    }

    // 获取节点类型
    const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);

    // 遍历节点的属性，添加样式类名
    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        if (attribute instanceof StyleAttribute) {
            classNames.push(attribute.getClassName(node.attributes[attrKey]));
        }
    });
    // 如果节点正在被拖拽，添加透明度和边框样式
    if (node.id === project.draggingId) {
        classNames.push('opacity-50', 'outline-none');
    }

    // 初始化属性对象
    const props = {};
    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        if (attribute.option.type === "props" && attribute instanceof Attribute) {
            props[attribute.name] = node.attributes[attrKey];
        }
    });


    // 选中框组件
    const SelectedBox = () => (
        project.draggingId === null && project.selectedId === node.id && (
            <div className="absolute pointer-events-none border top-0 right-0 bottom-0 left-0 border-blue-700"></div>
        )
    );

    // 父节点选中框组件
    const ParentOfSelectBox = () => {
        const selectedNode = NodeManager.getNode(project.selectedId);
        const parentOfSelectedNode = NodeManager.getNode(selectedNode?.parentId);
        return (
            parentOfSelectedNode && parentOfSelectedNode.id === node.id && (
                <div
                    className="absolute pointer-events-none border border-dotted top-0 right-0 bottom-0 left-0 border-blue-500"></div>
            )
        );
    };

    // 渲染节点内容
    const renderNodeContent = () => {
        switch (nodeType.option.render) {
            case "UIStack":
                return (
                    <div ref={ref} id={node.id} className={`${classNames.join(" ")} p-4 m-4 border`}>
                        <SelectedBox/>
                        <ParentOfSelectBox/>
                        {node.id}
                        {children}
                    </div>
                );
            case "UICard":
                return <UICard ref={ref} id={node.id} className={classNames.join(" ")} {...props} />;
            case "UIComponent":
                const rootNode = NodeManager.getNode(node.children[0]);
                classNames.push('border', 'p-4');
                return (
                    <UIComponent ref={ref} id={node.id} node={rootNode} className={classNames.join(" ")} {...props}>
                        <SelectedBox/>
                        <ParentOfSelectBox/>
                    </UIComponent>
                );
            default:
                return null;
        }
    };

    return renderNodeContent();
});

export default RenderNode;