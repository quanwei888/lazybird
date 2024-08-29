import React from "react";
import {useProject} from "@/lib/core/ProjectContext";
import {Attribute, NodeManager, NodeTypeManager} from "@/lib/core";
import {SelectSetting} from "./SelectSetting";
import {TabSetting} from "./TabSetting";
import {Separator} from "@/components/ui/separator";
import {TextSetting} from "./TextSetting";
import {ColorSelectSetting} from "./ColorSelectSetting";
import {LayoutSetting} from "./LayoutSetting";
import {SizeSetting} from "./SizeSetting";


export const PropertyPanel: React.FC = () => {
    const {project, actions} = useProject();
    if (!project?.selectedId) return <div className="w-96 h-full overflow-y-auto px-4">No node found</div>;;

    const node = NodeManager.getNode(project.selectedId);
    if (!node) return <div className="w-96 h-full overflow-y-auto px-4">No node found</div>;

    const nodeType = NodeTypeManager.getNodeType(node.nodeTypeId);
    if (!nodeType) return <div className="w-96 h-full overflow-y-auto px-4">No node type found</div>;

    const attributes = nodeType.getAttributes();
    const grouped = Object.entries(attributes).reduce((acc, [attrId, attribute]) => {
        const groupKey = attribute.option.group || 'default';
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push([attrId, attribute]);
        return acc;
    }, {} as Record<string, any[]>);


    return (
        <div className="w-96 h-full overflow-y-auto px-4">
            {Object.keys(grouped).map((group) => (
                <div key={group} className="mb-6">
                    <span className="bold mt-4">{group}</span>
                    <Separator className="my-2"/>
                    <div className="space-y-2">
                        {grouped[group].map(([attrId,attribute]) => {
                            const handleChange = (value: any) => {
                                node.setAttribute(attrId, value);
                                actions.reload();
                            };

                            switch (attribute.option.editMode) {
                                case "select":
                                    return (
                                        <SelectSetting
                                            key={attrId}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attrId)}
                                        />
                                    );
                                case "tab":
                                    return (
                                        <TabSetting
                                            key={attrId}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attrId)}
                                        />
                                    );
                                case "text":
                                    return (
                                        <TextSetting
                                            key={attrId}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attrId)}
                                        />
                                    );
                                case "color":
                                    return (
                                        <ColorSelectSetting
                                            key={attrId}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attrId)}
                                        />
                                    );
                                case "size":
                                    return (
                                        <SizeSetting
                                            key={attrId}
                                            attribute={attribute}
                                            onChange={handleChange}
                                            currentValue={node.getAttribute(attrId)}
                                        />
                                    );
                                case "layout":
                                    return (
                                        <LayoutSetting
                                            key={attrId}
                                            attribute={attribute}
                                            currentValue={node.getAttribute(attrId)}
                                            onChange={handleChange}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            ))}
            <div className="w-24"><pre>{JSON.stringify(node.attributes, null, 2)}</pre></div>
        </div>
    );
};
