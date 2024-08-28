import {useProject} from "@/lib/core/ProjectContext";
import {Search, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as Icon from '@radix-ui/react-icons';
import {Input} from "@/components/ui/input";
import {NodeManager, NodeTypeManager} from "@/lib/core";
import {Label} from "@/components/ui/label.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

export const ComponentList: React.FC = () => {
    const {project, actions} = useProject();

    if (!project) return null;

    const selectedItem = project.currentPageId && NodeManager.getNode(project.currentPageId).name;
    const addNewPage = () => {
        const nodeType = NodeTypeManager.getNodeTypeByName("@Page")
        const pageNode = nodeType.createNode();
        actions.setCurrentPageId(pageNode.id);
        actions.addPage(pageNode.id);
    };

    return (
        <div>
            <Command value={selectedItem} >
                <CommandInput placeholder="Type a command or search..."/>
                <CommandList>
                    aaas
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {project.pages.map((nodeId, index) => (
                            <CommandItem key={index}>{NodeManager.getNode(nodeId).name}</CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator/>
                    <CommandGroup heading="Components">
                        {project.components.map((nodeId, index) => (
                            <CommandItem key={index}>{NodeManager.getNode(nodeId).name}</CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
};