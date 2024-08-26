import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {LayoutIcon, LayersIcon, SunIcon} from '@radix-ui/react-icons'
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import {
    Search,
    Plus
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
import {Button} from "@/components/ui/button";
import * as Icon from '@radix-ui/react-icons';
import {Input} from "@/components/ui/input";
import {NodeTypeManager} from "@/lib/core/index.js";
import {Stack} from "@/lib/core/UI/index.js";

export const ComponentList = () => {
    const {project, actions} = useProject();

    if (!project) return null;

    const addNewPage = () => {
        const pageNode = NodeTypeManager.getNodeType("Stack").createNode()
        project.pages.push(pageNode)
        actions.setCurrentPageId(pageNode.id);
    }

    return (
        <div>

            <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                <div className="relative ml-auto flex-1">
                    <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full h-8 rounded-lg bg-background pl-8"
                    />
                </div>
                <div><Button variant="ghost" onClick={addNewPage}><Plus className="w-4 h-4"/></Button></div>
            </div>
            <div className="flex flex-col" value={project.currentPage.id}>
                {project.pages.map((node, index) => (
                    <Button variant="ghost" key={index} className=""
                            onClick={(value) => actions.setCurrentPageId(node.id)}>
                        <span className="w-full text-start text-neutral-500">{node.id}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}