import {Label} from "@/components/ui/label";
import {Component} from "./Component";
import * as Core from "@/lib/core/node.ts";

export const ToolBox: React.FC = () => {
    const currentDesignType = Core.project?.currentDesign?.nodeType;
    return (
        <div className="ml-2">
            <div>
                <Label>System</Label>
                <div className="grid grid-cols-2 gap-1">
                    {Object.values(Core.project.nodeTypes).map((nodeType, index) => {
                        if (currentDesignType == nodeType) return null;
                        return (
                            <Component key={nodeType.id} nodeType={nodeType}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};