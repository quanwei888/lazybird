import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {NodeManager, NodeTypeManager} from "@/lib/core/index.js";
import {useState} from "react";
import {ChevronRight, ChevronDown} from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {DragableBox} from "./DragableBox.jsx";

export const ToolBox = () => {
    const {project, actions} = useProject();
    if (!project) return null;

    const nodeTypes = NodeTypeManager.getNodeTypes();
    console.log(111111, nodeTypes, Object.keys(nodeTypes));

    return (
        <div className="ml-2">
            <div>
                <Label>System</Label>
                <div className="grid grid-cols-2 gap-1">
                    {Array.from(nodeTypes).map(([key, nodeType]) => (
                        <DragableBox key={key} nodeType={nodeType}/>
                    ))}
                </div>
            </div>
        </div>
    )
}