import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {LayoutIcon, LayersIcon, SunIcon} from '@radix-ui/react-icons'
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

export const ComponentList = () => {
    const {project, actions} = useProject();

    if (!project) return null;

    return (
        <Command className="rounded-lg border shadow-md" value={project.currentPage.id}>
            <CommandInput placeholder="Type a command or search..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {project.pages.map((node, index) => (
                    <CommandItem key={index} className="cursor-pointer"
                                 onSelect={(value) => actions.setCurrentPageId(node.id)}>
                        {node.id}
                    </CommandItem>
                ))}
                <CommandSeparator/>
            </CommandList>
        </Command>
    )
}