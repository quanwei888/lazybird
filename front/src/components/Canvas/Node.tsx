import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useDrag, useDrop, DragSourceMonitor, DropTargetMonitor} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {NodeManager, NodeTypeManager} from "@/lib/core/index.ts";
import {useProject} from "@/lib/core/ProjectContext";
import RenderNode from "@/components/Canvas/RenderNode.tsx";
import log from 'loglevel';

interface NodeProps {
    node: any;
}

interface DragItem {
    node: any;
    width: number;
    height: number;
}

export const Node: React.FC<NodeProps> = ({node}) => {
    const {project, actions} = useProject();
    const ref = useRef<HTMLDivElement>(null);

    // 使用useDrag钩子来处理拖拽逻辑
    const [{isDragging}, drag, preview] = useDrag({
        type: "Node",
        item: (): DragItem => {
            console.log('Drag started');
            actions.setSelectedId(node.id);
            const {width, height} = ref.current!.getBoundingClientRect();
            const item = {node, width, height};
            actions.setCurrentDrag({
                id: node.id,
                width: width,
                height: height,
            });
            return item;
        },
        canDrag: () => {
            return node.canDrag() && NodeManager.canEdit(node.id);
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                console.log('Drag ended successfully');
            } else {
                console.log('Drag ended without drop');
            }
            actions.setCurrentDrag(null);
            actions.setCurrentDrop(null);
        },
    });

    // 使用useEffect来设置拖拽预览图像
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);

    // 判断是否可以放置
    const canDrop = (sourceNode: any, targetNode: any) => {
        return targetNode.canDrop() && NodeManager.canEdit(node.id) && !NodeManager.isAncestor(sourceNode.id, targetNode.id);
    };

    // 计算插入索引
    const calculateInsertIndex = (sourceNode: any, targetNode: any, monitor: DropTargetMonitor) => {
        const hoverBoundingRect = ref.current!.getBoundingClientRect(); // 获取当前元素的边界矩形
        const clientOffset = monitor.getClientOffset(); // 获取鼠标偏移
        const hoverClientX = clientOffset!.x - hoverBoundingRect.left; // 鼠标相对X
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top; // 鼠标相对Y
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
        canDrop: (item: DragItem) => canDrop(item.node, node),
        drop: (item: DragItem, monitor: DropTargetMonitor) => {
            const sourceNode = item.node;
            if (currentDrop.id === node.id) {
                const pos = calculateInsertIndex(sourceNode, node, monitor);
                log.info(`[${sourceNode.id}] drop into pos [${pos}] of [${node.id}]`);
                if (pos !== null && pos >= 0) {
                    NodeManager.insertNode(sourceNode.id, node.id, pos);
                }
            }
            actions.setCurrentDrop(null);
        },
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            const sourceNode = item.node;
            let currentDropId = currentDrop.id;

            // 如果当前节点是被悬停的节点
            if (isOverCurrent) {
                // 初始化目标节点为当前节点
                let targetNode = node;
                // 向上遍历父节点，直到找到可以放置的节点或到达根节点
                while (targetNode && !canDrop(sourceNode, targetNode)) {
                    try {
                        targetNode = NodeManager.getNode(targetNode.parentId);
                    } catch (e) {
                        targetNode = undefined;
                    }
                }

                // 如果找到了可以放置的目标节点，设置currentDrop的id为目标节点的id
                if (targetNode) {
                    actions.setCurrentDrop({
                        id: targetNode.id,
                        index: currentDrop.index,
                    });
                    currentDropId = targetNode.id;
                }
            }

            // 如果当前悬停的节点是currentDrop的目标节点
            if (currentDropId === node.id) {
                // 计算插入位置
                const pos = calculateInsertIndex(sourceNode, node, monitor);
                log.info(`[${sourceNode.id}] hover into pos [${pos}] of [${node.id}]`);

                actions.setCurrentDrop({
                    id: node.id,
                    index: pos
                });
            }
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOverCurrent: monitor.isOver({shallow: true}),
            isOver: monitor.isOver(),
        }),
    });

    if (!project) return null;
    log.debug(`[Node][Node.${node.id}]`, project.currentDrop);
    const currentDrop = project.currentDrop ? project.currentDrop : {id: null, index: null};
    const currentDrag = project.currentDrag ? project.currentDrag : {id: null, index: null};
    drag(drop(ref));

    // 占位符组件
    const Placeholder: React.FC = () => {
        const style = {
            width: project.currentDrag.width,
            height: project.currentDrag.height,
        };
        return (
            <div style={style} className="border border-dotted border-gray-700"></div>
        );
    };

    const SelectedBox: React.FC = () => (
            project.currentDrag === null && project.selectedId === node.id && (
                <div
                    className="absolute z-10 pointer-events-none border-2 top-0 right-0 bottom-0 left-0 border-blue-700"></div>
            )
        )

    const ParentOfSelectBox: React.FC = () => {
        if (!project.selectedId) return null;
        const selectedNode = NodeManager.getNode(project?.selectedId);
        if (!selectedNode.parentId) return null;
        const parentOfSelectedNode = NodeManager.getNode(selectedNode.parentId);
        return (
            parentOfSelectedNode && parentOfSelectedNode.id === node.id && (
                <div
                    className="absolute pointer-events-none border border-dotted top-0 right-0 bottom-0 left-0 border-blue-500"></div>
            )
        );
    };

    const classNames = ['relative'];
    if (NodeManager.canEdit(node.id)) {
        classNames.push('can-be-selected', 'can-be-hovered');
    }
    if (node.id === project.currentDrag?.id) {
        classNames.push('opacity-20', 'outline-none');
    }

    return (
        <RenderNode node={node} ref={ref} classNames={classNames}>
            <SelectedBox/>
            {node.children.map((childId: string, index: number) => (
                <React.Fragment key={childId}>
                    {currentDrop.id === node.id && index === currentDrop.index && <Placeholder/>}
                    <Node key={childId} node={NodeManager.getNode(childId)}/>
                </React.Fragment>
            ))}
            {currentDrop.id === node.id && node.children.length === currentDrop.index &&
                <Placeholder/>}
        </RenderNode>
    );
};