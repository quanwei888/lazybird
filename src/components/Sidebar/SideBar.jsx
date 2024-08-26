import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {LayoutIcon, LayersIcon, SunIcon} from '@radix-ui/react-icons'
import {ComponentList} from "./ComponentList.jsx";
import {Tree} from "./Layers/Tree.jsx";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {ToolBox} from "./ToolBox.jsx";

export const SideBar = () => {
    return (
        <div className="flex flex-col w-full p-2 h-screen">
            <Tabs defaultValue="insert" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white space-x-0">
                    <TabsTrigger className="space-x-2 text-sm"
                                 value="account"> <span>Page</span></TabsTrigger>
                    <TabsTrigger className="space-x-2 text-sm"
                                 value="layers"> <span>Layers</span></TabsTrigger>
                    <TabsTrigger className="space-x-2 text-sm"
                                 value="insert"> <span>Insert</span></TabsTrigger>

                </TabsList>
                <TabsContent value="account"><Separator className="my-2"/><ComponentList/></TabsContent>
                <TabsContent value="layers"><Separator className="my-2"/><Tree/></TabsContent>
                <TabsContent value="insert"><Separator className="my-2"/><ToolBox/></TabsContent>
            </Tabs>
        </div>
    )
}