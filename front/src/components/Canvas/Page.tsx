import React, {useEffect, KeyboardEvent, MouseEvent} from "react";
import {Node} from "@/components/Canvas/Node";
import {CustomDragLayer} from "@/components/CustomDragLayer";
import {NodeManager} from "@/lib/core/index.ts";
import {useProject} from "@/lib/core/ProjectContext";
import log from 'loglevel';


export const Page: React.FC = () => {
    const {project, actions} = useProject();

    const handleSelect = (event: MouseEvent<HTMLDivElement>) => {
        event.currentTarget.focus();
        let target = event.target as HTMLElement;
        log.debug("Select Node", target);

        while (target && !target.classList.contains('can-be-selected')) {
            target = target.parentElement as HTMLElement;
        }

        if (target) {
            actions.setSelectedId(target.id);
        } else {
            actions.setSelectedId(null);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        console.log(event);
        if (event.key === 'Backspace' && project?.selectedId && project.selectedId !== project.currentPageId?.id) {
            // 删除被选中的节点
            event.currentTarget.blur();
            NodeManager.removeNode(project.selectedId);
            actions.setSelectedId(null);
        }
    };

    useEffect(() => {
        if (project) {
            const pageElement = document.getElementById('_page_');
            if (pageElement) {
                pageElement.addEventListener('click', handleSelect as EventListener);
                pageElement.addEventListener('keydown', handleKeyDown as EventListener);
                return () => {
                    pageElement.removeEventListener('click', handleSelect as EventListener);
                    pageElement.removeEventListener('keydown', handleKeyDown as EventListener);
                };
            }
        }
    }, [project]);

    log.debug(`[Render][Page]`,project);
    if (!project || !project.currentPageId) return null;
    const pageNode = NodeManager.getNode(project.currentPageId);
    console.log('pageNode', pageNode,NodeManager.nodes);

    return (
        <div className="max-w-full h-full px-12 py-4 rounded" id="_page_" tabIndex={0}>
            <div className="max-w-[768px] h-full bg-white">
                <CustomDragLayer/>
                <Node node={pageNode}/>
            </div>
        </div>
    );
};