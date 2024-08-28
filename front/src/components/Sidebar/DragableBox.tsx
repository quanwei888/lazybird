import { useRef } from "react";
import { useDrag } from "react-dnd";
import log from 'loglevel';
import { useProject } from "@/lib/core/ProjectContext";
import { PreviewNode } from "@/components/Sidebar/PreviewNode";

interface DragableBoxProps {
    nodeType: any; // Replace 'any' with the appropriate type if available
}

export const DragableBox: React.FC<DragableBoxProps> = ({ nodeType }) => {
    const { project, actions } = useProject();
    const ref = useRef<HTMLDivElement>(null);

    log.debug("[Render][DragableBox]");
    const [{ isDragging }, drag, preview] = useDrag({
        type: "Node",
        item: () => {
            const node = nodeType.createNode();
            console.log('Drag started');

            if (ref.current) {
                const { width, height } = ref.current.getBoundingClientRect();
                const item = { node, width, height };
                actions.setCurrentDrag({
                    id: node.id,
                    width: width,
                    height: height,
                });
                return item;
            }
            return { node, width: 0, height: 0 };
        },
        canDrag: () => true,
        collect: (monitor) => ({
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
    }, [project]);

    drag(ref);

    return (
        <div className="flex flex-col items-center justify-center w-full hover:bg-neutral-50 cursor-default">
            <div ref={ref} className="p-2 w-full h-16 aspect-h-16 border border-neutral-200 rounded opacity-50">
                <PreviewNode node={nodeType.createNode()} />
            </div>
            <span className="text-sm text-neutral-700">{nodeType.name}</span>
        </div>
    );
}