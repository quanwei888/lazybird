import {CustomDragLayer} from "@/components/CustomDragLayer.tsx";
import {CanvasNode} from "@/components/Render/CanvasNode.tsx";
import * as Core from "@/lib/core/node.ts";
import {SelectableContainer} from "@/components/Render/SelectableContainer.tsx";
import {DragItem, useProject} from "@/lib/core/ProjectContext.tsx";
import {DropTargetMonitor, useDrop} from "react-dnd";
import log from "loglevel";
import {useRef} from "react";

export const PageCanvas: React.FC = () => {
    const {state, actions} = useProject();

    const ref = useRef<HTMLDivElement>(null);
    const [{isOverCurrent, isOver}, drop] = useDrop({
        accept: 'Node',
        canDrop: () => true,
        drop: (item: DragItem, monitor: DropTargetMonitor) => {
            console.log("drop",item);
        },
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            console.log("hover",item);
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOverCurrent: monitor.isOver({shallow: true}),
            isOver: monitor.isOver(),
        }),
    });
    const node = Core.getRootNode();
    drop(ref);
    return (
        <SelectableContainer>
            <div ref={ref} className=" border border-blue-500 h-full mx-12 my-4 rounded bg-white overflow-auto" id="_page_"
                 tabIndex={0}>
                <div className="w-full h-full rounded-lg shadow-lg">
                    <CustomDragLayer/>
                    <CanvasNode node={node}/>
                </div>
            </div>
        </SelectableContainer>
    );
};