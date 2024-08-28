import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ComponentList} from "./ComponentList";
import {Tree} from "./Layers/Tree";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {ToolBox} from "./ToolBox";

export const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col w-full p-2">
            <Tabs defaultValue="pages" className="flex flex-col w-full ">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger className=""
                                 value="pages"> <span>Page</span></TabsTrigger>
                    <TabsTrigger className=""
                                 value="layers"> <span>Layers</span></TabsTrigger>
                    <TabsTrigger className=""
                                 value="insert"> <span>Insert</span></TabsTrigger>

                </TabsList>
                <TabsContent value="pages" className="flex-1 bg-red-50 overflow-auto">
                    <div className="h-96">sfaaa</div>
                    <div className="h-96">sfaaa</div>
                    <div className="h-96">sfaaa</div>
                </TabsContent>
                <TabsContent value="layers"><Tree/></TabsContent>
                <TabsContent value="insert"><ToolBox/></TabsContent>
            </Tabs>
        </div>
    )
}