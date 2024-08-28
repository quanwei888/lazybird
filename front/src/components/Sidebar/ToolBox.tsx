import {NodeTypeManager} from "@/lib/core";
import {Label} from "@/components/ui/label";
import {DragableBox} from "./DragableBox";


export const ToolBox: React.FC = () => {
    const nodeTypes = NodeTypeManager.getNodeTypes();


    return (
        <div className="ml-2">
            <div>
                <Label>System</Label>
                <div className="grid grid-cols-2 gap-1">
                    {Object.entries(nodeTypes).map(([nodeTypeId, nodeType]) => {
                        if (nodeType.name == "@Page") return null;
                        if (nodeType.name == "@Component") return null;
                        return (
                            <DragableBox key={nodeTypeId} nodeType={nodeType}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};