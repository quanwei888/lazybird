import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {NodeManager} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import RenderNode from "@/components/Canvas/RenderNode.jsx";
import log from 'loglevel';

export const Node = ({node}) => {
    const {project, actions} = useProject();
    const [currentDraggingItem, setCurrentDraggingItem] = useState(null);

    // 使用useDrag钩子来处理拖拽逻辑
    const [{isDragging}, drag, preview] = useDrag({
        type: "Node",
        item: () => {
            console.log('Drag started');
            actions.setSelectedId(node.id);
            actions.setDraggingId(node.id);

            const {width, height} = ref.current.getBoundingClientRect();
            const item = {node, width, height};
            return item;
        },
        canDrag: () => {
            return node.option.canDrag && NodeManager.canEdit(node.id);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                console.log('Drag ended successfully');
            } else {
                console.log('Drag ended without drop');
            }
            actions.setDraggingId(null);
            actions.setCurrentDrop(null);
        },
    });

    // 使用useEffect来设置拖拽预览图像
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, []);

    // 判断是否可以放置
    const canDrop = (sourceNode, targetNode) => {
        return node.option.canDrop && NodeManager.canEdit(node.id) && !NodeManager.isAncestor(sourceNode.id, targetNode.id);
    };

    // 计算插入索引
    const calculateInsertIndex = (sourceNode, targetNode, monitor) => {
        const hoverBoundingRect = ref.current.getBoundingClientRect(); // 获取当前元素的边界矩形
        const clientOffset = monitor.getClientOffset(); // 获取鼠标偏移
        const hoverClientX = clientOffset.x - hoverBoundingRect.left; // 鼠标相对X
        const hoverClientY = clientOffset.y - hoverBoundingRect.top; // 鼠标相对Y
        const targetChildren = targetNode.children; // 目标子节点
        let insertIndex = targetChildren.length; // 默认插入到末尾

        // 遍历子节点以确定插入位置
        for (let i = 0; i < targetChildren.length; i++) {
            const childElement = document.getElementById(targetChildren[i]);
            if (!childElement) continue;
            const childBoundingRect = childElement.getBoundingClientRect();
            const childMiddleY = (childBoundingRect.bottom + childBoundingRect.top) / 2 - hoverBoundingRect.top;
            const childMiddleX = (childBoundingRect.right + childBoundingRect.left) / 2 - hoverBoundingRect.left;

            // 根据布局方向判断插入位置
            if ((targetNode.direction() === "vertical" && hoverClientY < childMiddleY) ||
                (targetNode.direction() === "horizontal" && hoverClientX < childMiddleX)) {
                insertIndex = i;
                break;
            }
        }

        // 如果源节点是当前节点的子节点，不能插入到自身前后
        if (sourceNode.parentId === node.id) {
            const sourceIndex = targetChildren.indexOf(sourceNode.id);
            if (sourceIndex === insertIndex || sourceIndex === insertIndex - 1) {
                return null;
            }
        }

        return insertIndex;
    };

    // 使用useDrop钩子来处理放置逻辑
    const [{isOverCurrent, isOver}, drop] = useDrop({
        accept: 'Node',
        canDrop: (item) => canDrop(item.node, node),
        drop: (item, monitor) => {
            const sourceNode = item.node;
            if (!canDrop(item)) {
                return;
            }
            if (currentDrop.id == node.id) {
                const pos = calculateInsertIndex(sourceNode, node, monitor)
                log.info(`[${sourceNode.id}] drop into pos [${pos}]  of [${node.id}]`);
                if (pos >= 0) {
                    NodeManager.insertNode(sourceNode.id, node.id, pos);
                }
            }
            actions.setCurrentDrop(null)
        },
        hover: (item, monitor) => {
            const sourceNode = item.node;

            // 如果当前节点是被悬停的节点
            if (isOverCurrent) {
                // 初始化目标节点为当前节点
                let targetNode = node;
                // 向上遍历父节点，直到找到可以放置的节点或到达根节点
                while (targetNode && !canDrop(sourceNode, targetNode)) {
                    targetNode = NodeManager.getNode(targetNode.parentId);
                }

                // 如果找到了可以放置的目标节点，设置currentDrop的id为目标节点的id
                if (targetNode) {
                    currentDrop.id = targetNode.id;
                    currentDrop.index = null;
                    actions.setCurrentDrop(currentDrop);
                }
            }

            // 如果当前悬停的节点是currentDrop的目标节点
            if (currentDrop.id == node.id) {
                // 计算插入位置
                const pos = calculateInsertIndex(sourceNode, node, monitor);

                // 如果计算出的插入位置与currentDrop中的位置不同，更新拖拽项
                if (pos !== currentDrop.index) {
                    setCurrentDraggingItem(item);
                }
                // 更新currentDrop的id和index
                currentDrop.id = node.id;
                currentDrop.index = pos;
                actions.setCurrentDrop(currentDrop);
            } else {
                // 如果当前悬停的节点不是currentDrop的目标节点，清空拖拽项
                setCurrentDraggingItem(null);
            }
        },
        collect: (monitor) => ({
            isOverCurrent: monitor.isOver({shallow: true}),
            isOver: monitor.isOver(),
        }),
    });

    log.debug(`[Node][Node.${node.id}]`, project.currentDrop);
    const currentDrop = project.currentDrop ? project.currentDrop : {id: null, index: null};
    const ref = useRef(null);
    drag(drop(ref));

    // 占位符组件
    const Placeholder = () => {
        const style = {
            width: currentDraggingItem.width,
            height: currentDraggingItem.height,
        }
        return (
            <div style={style} className="border border-dotted border-gray-700"></div>
        )
    };

    return (
        <RenderNode node={node} ref={ref}>
            {node.children.map((childId, index) => (
                <React.Fragment key={childId}>
                    {currentDraggingItem && currentDrop.id == node.id && index === currentDrop.index && <Placeholder/>}
                    <Node key={childId} node={NodeManager.getNode(childId)}/>
                </React.Fragment>
            ))}
            {currentDraggingItem && currentDrop.id == node.id && node.children.length === currentDrop.index &&
                <Placeholder/>}
        </RenderNode>
    )
}