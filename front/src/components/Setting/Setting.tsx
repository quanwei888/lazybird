import React from "react";
import {useProject} from "@/lib/core/ProjectContext";
import {SelectSetting} from "./SelectSetting";
import {TabSetting} from "./TabSetting";
import {Separator} from "@/components/ui/separator";
import {TextSetting} from "./TextSetting";
import {ColorSelectSetting} from "./ColorSelectSetting";
import {LayoutSetting} from "./LayoutSetting";
import {SizeSetting} from "./SizeSetting";
import * as Core from "@/lib/core/node.ts";


const cssMapping: Record<string, Record<string, string>> = {
    padding: {
        "None": "",
        "S": "p-2",
        "M": "p-4",
        "L": "p-8",
    },
    color: {
        "None": "",
        "gray-50": "gray-50",
        "gray-100": "gray-100",
        "gray-200": "gray-200",
        "gray-300": "gray-300",
        "gray-400": "gray-400",
        "gray-500": "gray-500",
        "gray-600": "gray-600",
        "gray-700": "gray-700",
        "gray-800": "gray-800",
        "gray-900": "gray-900",
    },
    background: {
        "None": "",
        "gray-50": "gray-50",
        "gray-100": "gray-100",
        "gray-200": "gray-200",
        "gray-300": "gray-300",
        "gray-400": "gray-400",
        "gray-500": "gray-500",
        "gray-600": "gray-600",
        "gray-700": "gray-700",
        "gray-800": "gray-800",
        "gray-900": "gray-900",
    },
    border: {
        "None": "",
        "Primary": "border border-primary",
        "Neutral": "border border-neutral-200",
    },
    space: {
        "None": "",
        "S": "space-y-2",
        "M": "space-y-4",
        "L": "space-y-8",
    },
    corner: {
        "None": "",
        "S": "rounded-sm",
        "M": "rounded-md",
        "L": "rounded-lg",
    },
    shadow: {
        "None": "",
        "S": "shadow-sm",
        "M": "shadow-md",
        "L": "shadow-lg",
    },
    font: {
        "XS": "text-xs",
        "S": "text-sm",
        "M": "text-md",
        "L": "text-lg",
        "XL": "text-xl",
    },
};
const grouped: Record<string, any> = {
    "Style": [
        ["layout", "layout"],
        ["space", "tab"],
        ["padding", "tab"],
        ["font", "tab"],
        ["color", "color"],
        ["background", "color"],

        ["border", "tab"],
        ["corner", "tab"],
        ["shadow", "tab"],

        ["width", "size"],
        ["height", "size"],
    ]
}
export const Setting: React.FC = () => {
        const {state, actions} = useProject();

        if (!state || !state.seletecedNodeId) return null;
        const nodeId = state.seletecedNodeId;
        const node = Core.getNode(nodeId!);
        console.log(nodeId);

        return (
            <div className="w-96 h-full overflow-y-auto px-4">
                {Object.keys(grouped).map((group) => (
                    <div key={group} className="mb-6">
                        <span className="bold mt-4">{group}</span>
                        <Separator className="my-2"/>
                        <div className="space-y-2">
                            {grouped[group].map((prop: Record<string, any>) => {
                                const name = prop[0];
                                if (!(name in node.props.css)) return null;
                                const handleChange = (value: any) => {
                                    const css = {
                                        ...node.props.css,
                                        [name]: value,
                                    }
                                    actions.setNodeProps(node.id, "css", css);
                                };
                                const currentValue = node.props.css[name];
                                switch (prop[1]) {
                                    case "tab":
                                        return <TabSetting key={name} name={name} mapping={cssMapping[name]}
                                                           onChange={handleChange}
                                                           currentValue={currentValue}/>;
                                    case "color":
                                        return <ColorSelectSetting key={name} name={name} mapping={cssMapping[name]}
                                                                   onChange={handleChange}
                                                                   currentValue={currentValue}/>;
                                    case "layout":
                                        return <LayoutSetting key={name} onChange={handleChange}
                                                              currentValue={currentValue}/>;
                                    case "size":
                                        return <SizeSetting key={name} name={name} onChange={handleChange}
                                                            currentValue={currentValue}/>;
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>
                ))}
                <div className="w-24">
                    <pre>{JSON.stringify(node, null, 2)}</pre>
                </div>
            </div>
        );
    }
;
