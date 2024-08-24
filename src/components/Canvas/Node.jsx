import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {NodeManager} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import RenderNode from "@/components/Canvas/RenderNode.jsx";
import log from 'loglevel';

export const Node = ({node}) => {
    const {project, reload} = useProject();
    const [insertIndex, setInsertIndex] = useState(null);
    const [currentDraggingItem, setCurrentDraggingItem] = useState(null);
    //const node = NodeManager.getNode(id);

    const [{isDragging}, drag, preview] = useDrag({
        type: "Node",
        item: () => {
            console.log('Drag started');
            project.draggingId = node.id;
            project.selectedId = node.id;
            reload()
            const {width, height} = ref.current.getBoundingClientRect();
            return {node, width, height};
        },
        canDrag: () => node.option.canDrag,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                console.log('Drag ended successfully');
            } else {
                console.log('Drag ended without drop');
            }
            project.draggingId = null;
            project.overId = null;
            reload();
        },
    });
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, []);

    const canDrop = (item) => {
        const sourceNode = item.node;
        NodeManager.isAncestor(sourceNode.id, node.id)
        return node.option.canDrop && !NodeManager.isAncestor(sourceNode.id, node.id);
    };
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
            //log.debug("childMiddleY", childMiddleY, "childMiddleX", childMiddleX)
            //log.debug(1234,targetNode.constructor.name)
            // 根据布局方向判断插入位置
            if ((targetNode.direction() === "vertical" && hoverClientY < childMiddleY) ||
                (targetNode.direction() === "horizontal" && hoverClientX < childMiddleX)) {
                insertIndex = i;
                //log.debug(111, insertIndex, targetNode.direction(), childMiddleY, hoverClientY)
                break;
            }
        }

        // 如果源节点是当前节点的子节点，不能插入到自身前后
        if (sourceNode.parentId === node.id) {
            const sourceIndex = targetChildren.indexOf(sourceNode.id);
            if (sourceIndex === insertIndex || sourceIndex === insertIndex - 1) {
                //log.debug(555, sourceNode.id)
                return -1;
            }
        }

        return insertIndex;
    };


    const [{isOverCurrent, isOver}, drop] = useDrop({
        accept: 'Node',
        canDrop,
        drop: (item, monitor) => {
            const sourceNode = item.node;
            if (!canDrop(item)) {
                return;
            }
            if (project.overId == node.id) {
                const pos = calculateInsertIndex(sourceNode, node, monitor)
                log.info(`[${sourceNode.id}] drop into pos [${pos}]  of [${node.id}]`);
                if (pos >= 0) {
                    NodeManager.insertNode(sourceNode.id, node.id, pos);
                    reload();
                }
            }
            setInsertIndex(null);
        },
        hover: (item, monitor) => {
            const sourceNode = item.node;

            // 1) 设置 OverId
            if (isOverCurrent) {
                // 1-1）从该节点往上找尝试找到可以drop 的节点targetNode
                let targetNode = node;
                while (targetNode && (!targetNode.option.canDrop || NodeManager.isAncestor(sourceNode.id, targetNode.id))) {
                    targetNode = NodeManager.getNode(targetNode.parentId)
                }

                if (targetNode) {
                    //找到了
                    if (project.overId != targetNode.id) {
                        project.overId = targetNode.id;
                        reload()
                    }
                }
            }


            // 2) 如果正好是 overId 的 node
            if (project.overId == node.id) {
                const pos = calculateInsertIndex(sourceNode, node, monitor)
                log.debug(`[${sourceNode.id}] hover into pos [${pos}]  of [${node.id}]`);
                if (insertIndex !== pos) {
                    setInsertIndex(pos);
                    setCurrentDraggingItem(item);
                    reload();
                }
            }
        },
        collect: (monitor) => ({
            isOverCurrent: monitor.isOver({shallow: true}),
            isOver: monitor.isOver(),
        }),
    });

    log.debug(`[Render][Node.${node.id}]`);
    const ref = useRef(null);
    drag(drop(ref));

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
                    {project.overId == node.id && index === insertIndex && <Placeholder/>}
                    <Node key={childId} node={NodeManager.getNode(childId)}/>
                </React.Fragment>
            ))}
            {project.overId == node.id && node.children.length === insertIndex && <Placeholder/>}
        < /RenderNode>
    )
}