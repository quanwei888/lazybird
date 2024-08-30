import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ProjectProvider} from "@/lib/core/ProjectContext"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
//import {Design} from "@/components/Canvas/Design";
//import {Setting} from "@/components/Setting/Setting";
import {Sidebar} from "@/components/Sidebar/Sidebar.tsx";
import Test from "@/components/Test.tsx";
import React from "react";
import {PageCanvas} from "@/components/Render/PageCanvas.tsx";
import {Setting} from "@/components/Setting/Setting.tsx";


const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
                <ProjectProvider>
                    <div className="h-screen w-full flex flex-col bg-neutral-50">
                        <header className=" p-4 h-16 border-b flex items-center">
                            <h1 className="text-2xl font-bold">Lazy Bird</h1>
                        </header>
                        <main className="flex-1  flex h-full w-full  overflow-hidden">
                            <div className="flex-0 w-72 h-full border-r  bg-white flex flex-col overflow-hidden">
                                <Sidebar/>
                            </div>
                            <div className="flex-1 h-full flex flex-col overflow-hidden">
                                <PageCanvas/>
                            </div>
                            <div className="flex-0 h-full border-l bg-white flex flex-col overflow-hidden">
                                <Setting/>
                            </div>
                        </main>
                    </div>
                </ProjectProvider>
            </DndProvider>
        </QueryClientProvider>
    );
}

export default App;
