import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ItemList} from "./Pages/ItemList.tsx";
import React from "react";
import {ToolBox} from "./Inserts/ToolBox";


export const Sidebar: React.FC = () => {
    const [value, setValue] = React.useState("Pages")
    return (
        <>
            <Tabs defaultValue="Pages" onValueChange={setValue}>
                <TabsList className="w-full mb-2 rounded-none">
                    <TabsTrigger value="Pages">Pages</TabsTrigger>
                    <TabsTrigger value="Layers">Layers</TabsTrigger>
                    <TabsTrigger value="Inserts">Inserts</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex-0 w-full h-full  overflow-y-auto">
                {value === "Pages" && <ItemList></ItemList>}
                {value === "Inserts" && <ToolBox></ToolBox>}
            </div>
        </>
    )
}