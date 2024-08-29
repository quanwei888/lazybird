import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ComponentList} from "./ComponentList";
import React from "react";
import {ToolBox} from "./ToolBox";


export const Sidebar: React.FC = () => {
    const [value, setValue] = React.useState("Pages")
    return (
        <>
            <Tabs defaultValue="Pages" onValueChange={setValue}>
                <TabsList className="w-full mb-2 rounded-none" >
                    <TabsTrigger value="Pages">Pages</TabsTrigger>
                    <TabsTrigger value="Layers">Layers</TabsTrigger>
                    <TabsTrigger value="Insert">Inserts</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex-0 w-full h-full  overflow-y-auto">
                {value === "Pages" && <ComponentList></ComponentList>}
                {value === "Insert" && <ToolBox></ToolBox>}
            </div>
        </>
    )
}