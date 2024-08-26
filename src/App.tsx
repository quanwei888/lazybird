import Hello from '@/components/Hello.jsx';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ProjectProvider} from "@/lib/core/Project/ProjectContext.jsx"
import {SideBar} from '@/components/index.js';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Page, PropertyPanel} from "@/components/index.js";
import {Fragment} from "react";


const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
                <ProjectProvider>
                    <div className="flex h-screen w-screen overflow-hidden flex-col bg-neutral-50">
                        <header className="h-24 w-full bg-blue-300-100"></header>
                        <main style={{height: "200px"}}
                              className="flex w-full h-full flex-grow flex-row border">
                            <div id="left" className="h-full w-72  overflow-y-auto border-r bg-white">
                                <SideBar/>
                            </div>
                            <div id="canvas" className="flex-grow overflow-y-auto"><Page/></div>
                            <div id="right" className="h-full w-80 overflow-x-hidden overflow-y-auto border-l bg-white">
                                <PropertyPanel/>
                            </div>
                        </main>
                    </div>
                </ProjectProvider>
            </DndProvider>
        </QueryClientProvider>
    );
}

export default App;
