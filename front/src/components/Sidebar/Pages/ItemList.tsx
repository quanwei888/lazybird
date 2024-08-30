import {useProject} from "@/lib/core/ProjectContext";
import {Plus, MoreVertical, StickyNote, Component} from "lucide-react";
import * as Core from "@/lib/core/node";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {MenuButton} from "@/components/Common/MenuButton";

export const ItemList: React.FC = () => {
        const {state, actions} = useProject();

        const currentPage = Core.project.currentDesign ? Core.project.currentDesign : Core.project.pages[0];
        const generateUniqueName = (baseName: string, existingNames: string[]): string => {
            let index = 1;
            let newName = `${baseName}_${index}`;
            while (existingNames.includes(newName)) {
                index++;
                newName = `${baseName}_${index}`;
            }
            return newName;
        };

        const handleAddPage = () => {
            const existingIds = Core.project.pages.map(design => design.id);
            const id = generateUniqueName("Page", existingIds);
            actions.addPage(id);
        }
        const handleAddComponent = () => {
            const existingIds = Core.project.components.map(design => design.id);
            const id = generateUniqueName("Component", existingIds);
            actions.addComponent(id);
        }
        const handleAdd = (command: string) => {
            if (command === "addPage") {
                console.log("add page");
                handleAddPage();
            } else if (command === "addComponent") {
                console.log("add component");
                handleAddComponent();
            }
        }

        return (
            <Command value={currentPage?.id}>
                <div className="flex w-full items-center justify-between space-x-2 mb-2">
                    <CommandInput placeholder="Type a command or search..." className="h-8"/>
                    <MenuButton onValueChange={handleAdd}
                                options={{addPage: "Add Design", addComponent: "Add Component"}}>
                        < Plus className="h-3.5 w-3.5"/>
                    </MenuButton>
                </div>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {Core.project.pages.map((page, index) => {
                            return (
                                <CommandItem
                                    key={page.id}
                                    onSelect={() => actions.editDesign(page.id)}
                                    value={page.id}
                                    className="w-full flex justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        < StickyNote
                                            className="h-3.5 w-3.5"/>
                                        <span>{page.id}</span>
                                    </div>
                                    <MenuButton onValueChange={() => actions.delPage(page.id)}
                                                options={{delete: "Delete"}}>
                                        < MoreVertical className="h-3.5 w-3.5"/>
                                    </MenuButton></CommandItem>
                            )
                        })}
                    </CommandGroup>
                    <CommandSeparator/>
                    <CommandGroup heading="Components">
                        {Object.values(Core.project.components).map((component, index) => {
                            return (
                                <CommandItem
                                    key={component.id}
                                    value={component.id}
                                    onSelect={() => actions.editDesign(component.id)}
                                    className="w-full flex justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        < Component
                                            className="h-3.5 w-3.5"/>
                                        <span>{component.id}</span>
                                    </div>
                                    <MenuButton onValueChange={() => actions.delComponent(component.id)}
                                                options={{delete: "Delete"}}>
                                        < MoreVertical className="h-3.5 w-3.5"/>
                                    </MenuButton></CommandItem>
                            )
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>
        )
            ;
    }
;