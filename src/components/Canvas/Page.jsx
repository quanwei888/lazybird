import React, {useEffect} from "react";
import {Node} from "@/components/Canvas/Node";
import {CustomDragLayer} from "@/components/CustomDragLayer.jsx";
import {NodeManager} from "@/lib/core/index.js";
import {useProject} from "@/lib/core/Project/ProjectContext.jsx";
import log from 'loglevel';

export const Page = ({id}) => {
    const {project, reload} = useProject();

    const handleSelect = (event) => {
        event.currentTarget.focus();
        let target = event.target;
        log.debug("Select Node",target);
        while (target && !target.classList.contains('selectable')) {
            target = target.parentElement;
        }

        log.debug("Select Node",target);
        if (target) {
            if (target.id != project.selectedId) {
                const id = target.id;
                project.selectedId = target.id;
                reload();
            }
        } else {
            if (project.selectedId) {
                project.selectedId = null;
                reload();
            }
        }
    };


    const addOverlay = (target, overlayId, className = "outline outline-2 outline-blue-700") => {
        removeOverlay(overlayId); // Ensure no previous overlay exists
        const overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.className = className;
        overlay.style.position = 'absolute';
        overlay.style.pointerEvents = 'none';
        const rect = target.getBoundingClientRect();
        const pageRect = document.getElementById('_page_').getBoundingClientRect();
        overlay.style.top = `${rect.top - pageRect.top}px`;
        overlay.style.left = `${rect.left - pageRect.left}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        document.getElementById('_page_').appendChild(overlay);
    };


    const removeOverlay = (overlayId = 'node-overlay') => {
        const existingOverlay = document.getElementById(overlayId);
        if (existingOverlay) {
            existingOverlay.remove();
        }
    };

    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === 'Backspace' && project.selectedId && project.selectedId != project.currentPage.id) {
            // 删除被选中的节点
            NodeManager.removeNode(project.selectedId);
            project.selectedId = null;
            reload();
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

    useEffect(() => {
        //removeOverlay("overlay-selected");
        if (project) {
            if (project.selectedId) {
                const target = document.getElementById(project.selectedId);
                if (target) {

                    addOverlay(target, "overlay-selected");

                    //父节点视觉效果
                    let parent = target.parentElement
                    while (parent && !parent.classList.contains('selectable')) {
                        parent = parent.parentElement;
                    }
                    if (parent) {
                        //addOverlay(parent, "overlay-selected-parent", "outline outline-dotted outline-gray-700");
                    }
                }
            } else {
                removeOverlay("overlay-selected");
                removeOverlay("overlay-selected-parent");
            }

            if (project.overId) {
                const target = document.getElementById(project.overId);
                if (target) {
                    addOverlay(target, "overlay-over-selected", "outline outline-dotted outline-blue-700");
                }
            } else {
                removeOverlay("overlay-over-selected");
            }
        }
    }, [project]);

    log.debug(`[Render][Page}`);

    return (
        <div className="p-8 h-screen w-full flex flex-row overflow-hidden " id="_page_" tabIndex="0">
            <CustomDragLayer/>
            <div className="grow">{project?.currentPage && <Node node={project.currentPage}/>}</div>

            <div className="w-64 text-xs overflow-auto">
                <pre>{JSON.stringify(NodeManager.getNode(project?.selectedId), null, 2)}</pre>
                <pre>{JSON.stringify(project, null, 2)}</pre>
            </div>

        </div>
    )
}