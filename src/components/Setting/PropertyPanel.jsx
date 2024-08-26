import React from "react";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {NodeManager, NodeTypeManager} from "@/lib/core/index.js";
import {SelectSetting} from "./SelectSetting.jsx";
import {TabSetting} from "./TabSetting.jsx";
import {Separator} from "@/components/ui/separator";
import {TextSetting} from "./TextSetting.jsx";
import {ColorSelectSetting} from "./ColorSelectSetting.jsx";
import {LayoutSetting} from "./LayoutSetting.jsx";

export const PropertyPanel = () => {
    const {project, actions} = useProject();
    if (!project?.selectedId) return null;

    const node = NodeManager.getNode(project.selectedId);
    const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
    const attributes = nodeType.getAttributes();
    const groupedAttributes = attributes.reduce((groups, attribute) => {
        const group = attribute.option.group || 'default';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(attribute);
        return groups;
    }, {});

    return (
        <div className="text-sm px-4 w-full">
            {Object.keys(groupedAttributes).map((group) => (
                <div key={group} className="mb-6">
                    <span className="bold mt-4">{group}</span>
                    <Separator className="my-2"/>
                    <div className="space-y-2">
                        {groupedAttributes[group].map((attribute) => {
                            const handleChange = (value) => {
                                node.setAttribute(attribute.id, value);
                                actions.reload();
                            }

                            switch (attribute.option.editMode) {
                                case "select":
                                    return (
                                        <SelectSetting
                                            key={attribute.id}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attribute.id)}
                                        />
                                    )
                                case "tab":
                                    return (
                                        <TabSetting
                                            key={attribute.id}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attribute.id)}
                                        />
                                    )
                                case "text":
                                    return (
                                        <TextSetting
                                            key={attribute.id}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attribute.id)}
                                        />
                                    )
                                case "color":
                                    return (
                                        <ColorSelectSetting
                                            key={attribute.id}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attribute.id)}
                                        />
                                    )
                                case "layout":
                                    return (
                                        <LayoutSetting
                                            key={attribute.id}
                                            attribute={attribute}
                                            currentValue={node.getAttribute(attribute.id)}
                                            onChange={handleChange}
                                        />
                                    )
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            ))}
            <pre>{JSON.stringify(node, null, 2)}</pre>
        </div>
    )
}
