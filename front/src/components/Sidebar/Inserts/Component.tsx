import {useRef} from "react";
import {useDrag} from "react-dnd";
import log from 'loglevel';
import {DragItem, useProject} from "@/lib/core/ProjectContext";
import * as Core from "@/lib/core/node.ts";
import {Plus, Dice1, StickyNote} from "lucide-react";
import {MenuButton} from "@/components/Common/MenuButton.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ComponentProps {
    nodeType: Core.NodeType; // Replace 'any' with the appropriate type if available
}

export const Component: React.FC<ComponentProps> = ({nodeType}) => {
    const {state, actions} = useProject();
    const ref = useRef<HTMLButtonElement>(null);
    const [{isDragging}, drag, preview] = useDrag({
        type: "Node",
        item: () => {
            console.log('Drag started');
            const {width, height} = ref.current!.getBoundingClientRect();
            const item: DragItem = {id: nodeType.id, type: "NodeType", width, height};
            actions.startDrag(item);
            return item;
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
            actions.endDrag();
        },
    }, []);

    log.debug("[Render][Component]");
    drag(ref);

    return (
        <Button ref={ref} variant="ghost" className="w-full">
            <div className="flex w-full items-center space-x-2">
                <div className="bg-neutral-100 p-2 rounded">< Dice1
                    className="h-3.5 w-3.5 text-neutral-500"/></div>

                <span>{nodeType.id}</span>
            </div>
        </Button>
    );
}