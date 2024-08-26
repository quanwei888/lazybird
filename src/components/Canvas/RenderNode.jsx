import React, {forwardRef} from 'react';
import {
    PropsAttribute,
    StyleAttribute,
    NodeTypeManager,
    NodeManager,
} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import log from 'loglevel';
import {UIStack, UILabel} from "./ui/index.js";

const RenderNode = forwardRef(({children, node, classNames = []}, ref) => {
    log.debug(`[Render][RenderNode.${node.id}][${node.nodeTypeId}]`);

    // 获取节点类型
    const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
    classNames = [...classNames];

    // 遍历节点的属性，添加样式类名
    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        if (attribute instanceof StyleAttribute) {
            classNames.push(attribute.getClassName(node.getAttribute(attrKey)));
        }
    });

    // 初始化属性对象
    const props = {};
    Object.keys(node.attributes).forEach(attrKey => {
        const attribute = nodeType.getAttribute(attrKey);
        if (attribute instanceof PropsAttribute) {
            props[attribute.name] = node.getAttribute(attrKey);
        }
    });


    // 渲染节点内容
    const renderNodeContent = () => {
        switch (nodeType.option.render) {
            case "UIStack":
                return (
                    <UIStack ref={ref} id={node.id} className={classNames.join(" ")} {...props}>
                        {children}
                    </UIStack>
                );
            case "UILabel":
                return <UILabel ref={ref} id={node.id} className={classNames.join(" ")} {...props}>
                    {children}
                </UILabel>;
            default:
                return null;
        }
    };

    return renderNodeContent();
});

export default RenderNode;