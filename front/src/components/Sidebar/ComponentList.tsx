import { useProject } from "@/lib/core/ProjectContext";
import {  Plus, MoreVertical } from "lucide-react";
import { NodeManager, NodeTypeManager } from "@/lib/core";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { MenuButton } from "@/components/Common/MenuButton.tsx";

export const ComponentList: React.FC = () => {
    const { project, actions } = useProject();

    if (!project) return null;

    const selectedItem = project.currentPageId ? NodeManager.getNode(project.currentPageId).id : "";
    const generateUniqueName = (baseName: string, existingNames: string[]): string => {
        let index = 0;
        let newName = `${baseName}_${index}`;
        while (existingNames.includes(newName)) {
            index++;
            newName = `${baseName}_${index}`;
        }
        return newName;
    };

    const handleAdd = (command: string) => {
        if (command === "addPage") {
            const nodeType = NodeTypeManager.getNodeTypeByName("@Page");
            const node = nodeType.createNode();
            const existingPageNames = project.pages.map(pageId => NodeManager.getNode(pageId).name);
            node.name = generateUniqueName("Page", existingPageNames);

            actions.setCurrentPageId(node.id);
            actions.addPage(node.id);
        } else if (command === "addComponent") {
            const nodeType = NodeTypeManager.getNodeTypeByName("@Component");
            const node = nodeType.createNode();
            const existingComponentNames = project.components.map(componentId => NodeManager.getNode(componentId).name);
            node.name = generateUniqueName("Component", existingComponentNames);

            actions.addComponent(node.id);
            actions.setCurrentPageId(node.id);
        }
    };

    return (
        <Command value={selectedItem}>
            <div className="flex w-full items-center justify-between space-x-2 mb-2">
                <CommandInput placeholder="Type a command or search..." className="h-8" />
                <MenuButton onValueChange={handleAdd} options={{ addPage: "Add Page", addComponent: "Add Component" }}>
                    < Plus className="h-3.5 w-3.5" />
                </MenuButton>
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    {project.pages.map((nodeId, index) => {
                        const node = NodeManager.getNode(nodeId);
                        return (
                            <CommandItem key={nodeId} value={node.id} className="w-full flex justify-between"
                                onSelect={() => actions.setCurrentPageId(node.id)}>
                                <span>{node.name}</span>
                                <MenuButton onValueChange={() => actions.removePage(nodeId)}
                                    options={{ delete: "Delete" }}>
                                    < MoreVertical className="h-3.5 w-3.5" />
                                </MenuButton></CommandItem>
                        )
                    })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Components">
                    {project.components.map((nodeId, index) => {
                        const node = NodeManager.getNode(nodeId);
                        return (
                            <CommandItem key={nodeId} value={node.id} className="w-full flex justify-between"
                                onSelect={() => actions.setCurrentPageId(node.id)}>
                                <span>{node.name}</span>
                                <MenuButton onValueChange={() => actions.removeComponent(nodeId)}
                                    options={{ delete: "Delete" }}>
                                    <MoreVertical className="h-3.5 w-3.5" />
                                </MenuButton>
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
        ;
};