import React, {useEffect} from "react";
import {Node} from "@/components/Canvas/Node";
import {CustomDragLayer} from "@/components/CustomDragLayer.jsx";
import {NodeManager} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import log from 'loglevel';

export const Page = ({id}) => {
    const {project, actions} = useProject();

    const handleSelect = (event) => {
        event.currentTarget.focus();
        let target = event.target;
        log.debug("Select Node", target);

        while (target && !target.classList.contains('can-be-selected')) {
            target = target.parentElement;
        }

        if (target) {
            actions.setSelectedId(target.id)
        } else {
            actions.setSelectedId(null)
        }
    };


    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === 'Backspace' && project.selectedId && project.selectedId != project.currentPage.id) {
            // 删除被选中的节点
            NodeManager.removeNode(project.selectedId);
            actions.setSelectedId(null)
        }
    };

    useEffect(() => {
        if (project) {
            const pageElement = document.getElementById('_page_');
            //log.debug("pageElement", pageElement);
            pageElement.addEventListener('click', handleSelect);
            pageElement.addEventListener('keydown', handleKeyDown);
            return () => {
                pageElement.removeEventListener('click', handleSelect);
                pageElement.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [project]);

    log.debug(`[Render][Page}`);

    return (
        <div className="w-full h-full px-12 py-4 rounded" id="_page_" tabIndex="0">
            <div className="w-full h-full bg-white">
                <CustomDragLayer/>
                {project?.currentPage && <Node node={project.currentPage}/>}
            </div>
        </div>
    )
}