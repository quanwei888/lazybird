import {useProject} from "@/lib/core/ProjectContext";
import {Search, Plus, MoreVertical} from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ComponentList: React.FC = () => {
    const {project, actions} = useProject();

    if (!project) return null;

    const selectedItem = project.currentPageId && NodeManager.getNode(project.currentPageId).id;
    const addNewPage = () => {
        const nodeType = NodeTypeManager.getNodeTypeByName("@Page")
        const pageNode = nodeType.createNode();
        actions.setCurrentPageId(pageNode.id);
        actions.addPage(pageNode.id);
    };

    return (
        <div className="flex-1 overflow-auto">
            <Command value={selectedItem} className="flex-1 overflow-auto">
                <CommandList className="h-full">
                    <div className="flex w-full items-center justify-between">
                        <CommandInput className="w-48" placeholder="Type a command or search..."/>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={addNewPage}>
                            <Plus className="h-3.5 w-3.5"/>
                        </Button>
                    </div>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {project.pages.map((nodeId, index) => {
                            const node = NodeManager.getNode(nodeId);
                            return (
                                <div className="key={index} flex justify-between">
                                    <CommandItem value={node.id}>{node.name}</CommandItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )
                        })}
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