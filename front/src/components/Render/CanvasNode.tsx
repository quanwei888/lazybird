import * as Core from "@/lib/core/node.ts";
import React, {useEffect, useRef} from "react";
import {DragSourceMonitor, DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import log from "loglevel";
import {useProject, State, DragItem} from "@/lib/core/ProjectContext.tsx";
import NodeRender from "./NodeRender.tsx";
import {findFirstDropableNode} from "@/lib/core/node.ts";
import {getEmptyImage} from "react-dnd-html5-backend";

interface CanvasRenderProps {
    node: Core.Node;
}

const findPosOfInserted = (element: HTMLElement, node: Core.Node | undefined, container: Core.Node, monitor: DropTargetMonitor) => {
    const containerPos = element.getBoundingClientRect(); // 获取当前元素的边界矩形
    const mousePos = monitor.getClientOffset(); // 获取鼠标偏移
    const mouseX = mousePos!.x - containerPos.left; // 鼠标相对X
    const mouseY = mousePos!.y - containerPos.top; // 鼠标相对Y

    const children = container.children; // 目标子节点
    let pos = children.length; // 默认插入到末尾
    // 遍历子节点以确定插入位置
    for (let i = 0; i < children.length; i++) {
        const child = document.getElementById(children[i]);
        if (!child) continue;
        const childPos = child.getBoundingClientRect();
        const childMiddleY = (childPos.bottom + childPos.top) / 2 - containerPos.top;
        const childMiddleX = (childPos.right + childPos.left) / 2 - containerPos.left;

        // 根据布局方向判断插入位置
        const direction = Core.getDirection(container);
        if ((direction === "y" && mouseY < childMiddleY) ||
            (direction === "x" && mouseX < childMiddleX)) {
            pos = i;
            break;
        }
    }
    // 如果源节点是当前节点的子节点，不能插入到自身前后
    if (node?.parentId === container.id) {
        const npos = children.indexOf(node.id);
        if (npos === pos || npos === pos - 1) {
            return -1;
        }
    }
    return pos;
}

export const CanvasNode: React.FC<CanvasRenderProps> = ({node}) => {
    const {state, actions} = useProject();
    const ref = useRef<HTMLElement>(null);
    const [{isDragging}, drag, preview] = useDrag({
        type: "Node",
        item: (): DragItem => {
            console.log('Drag started');
            const {width, height} = ref.current!.getBoundingClientRect();
            const item = {id: node.id, type: "Node", width, height};
            actions.startDrag(item);
            return item;
        },
        canDrag: () => Core.canDragNode(node),
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                console.log('Drag ended successfully');
            } else {
                console.log('Drag ended without drop');
            }
            actions.endDrag();
            actions.endHover();
        },
    });
    const [{isOverCurrent, isOver}, drop] = useDrop({
        accept: 'Node',
        canDrop: (item: DragItem) => {
            if (item.type == 'Node') {
                const srcNode = Core.getNode(item.id);
                return Core.canDropNode(srcNode, node);
            } else {
                return Core.canDropNode(undefined, node);
            }
        },
        drop: (item: DragItem, monitor: DropTargetMonitor) => {
            if (state?.dropItem?.id !== node.id) {
                return;
            }
            let srcNode: any = undefined;
            if (item.type == 'NodeType') {
                const nodeType = Core.getNodeType(item.id);
                srcNode = Core.createNode(nodeType);
            } else {
                srcNode = Core.getNode(item.id);
            }
            console.log('Drop', state!.dropItem);
            Core.insertNode(srcNode, node, state!.dropItem.pos);
        },
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            const srcNode = item.type == 'Node' ? Core.getNode(item.id) : undefined;
            let container: Core.Node | undefined = undefined;
            if (state!.dropItem) {
                container = Core.getNode(state!.dropItem.id);
            }
            if (isOverCurrent) {
                container = Core.findFirstDropableNode(srcNode, node);
                if (container) {
                    actions.startHover({
                        id: container.id,
                        pos: state?.dropItem?.pos,
                    });
                }
            }

            // 如果当前悬停的节点是currentDrop的目标节点
            if (container === node) {
                // 计算插入位置
                const pos = findPosOfInserted(ref.current!, srcNode, container!, monitor);
                log.info(`[${srcNode?.id}] hover into pos [${pos}] of [${container?.id}]`);

                actions.startHover({
                    id: container!.id,
                    pos: pos,
                });
            }
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOverCurrent: monitor.isOver({shallow: true}),
            isOver: monitor.isOver(),
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);

    console.log('render CanvasNode', node);
    if (!node) return null;
    if (!state) return null;

    drag(drop(ref));
    const dragItem = state.dragItem;
    const dropItem = state.dropItem;

    if (Core.canEdit(node)) {
        node.props.selectable = true;
    }

    const Placeholder: React.FC = () => {
        const style = {
            width: dragItem?.width,
            height: dragItem?.height,
        };
        return (
            <div style={style} className="border border-dotted border-gray-700"></div>
        );
    };

    return (
        <NodeRender node={node} ref={ref}>
            {node.children.map((childId: string, index: number) => (
                <React.Fragment key={childId}>
                    {dropItem?.id === node.id && index === dropItem.pos && <Placeholder/>}
                    <CanvasNode key={childId} node={Core.getNode(childId)}/>
                </React.Fragment>
            ))}
            {dropItem?.id === node.id && node.children.length === dropItem.pos && <Placeholder/>}
        </NodeRender>
    );
}