import CountBtn from '@/components/CountBtn';
import ReactSVG from '@/assets/react.svg';
import {Badge} from '@/components/ui/badge';
import Hello from '@/components/Hello.jsx';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ProjectProvider} from "@/lib/core/Project/ProjectContext.jsx"
import {Page} from '@/components/Canvas/Page.jsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
                <ProjectProvider>
                    <div className="w-screen h-screen ">
                        <Page/>
                        <Hello/>
                    </div>
                </ProjectProvider>
            </DndProvider>
        </QueryClientProvider>
    );
}

export default App;
