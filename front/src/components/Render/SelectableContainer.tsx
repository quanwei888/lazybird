import React, {ReactNode, useEffect, useRef, useState} from "react";
import {useProject} from "@/lib/core/ProjectContext.tsx";

interface SelectableContainerProps {
    children: ReactNode;
}

export const SelectableContainer: React.FC<SelectableContainerProps> = ({ children }) => {
    const {state, actions} = useProject();
    const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const hoverDivRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target !== containerRef.current && target.hasAttribute('data-selectable')) {
            setSelectedElement(target);
            actions.selectNode(target.id);
        }
    };

    const handleMouseOver = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target !== containerRef.current && target.hasAttribute('data-selectable')) {
            setHoveredElement(target);
        }
    };

    const handleMouseOut = () => {
        setHoveredElement(null);
    };

    const handleDrag = () => {
        setSelectedElement(null);
        setHoveredElement(null);
    };

    const updateSelection = () => {
        if (selectedElement && containerRef.current) {
            const rect = selectedElement.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            const highlightDiv = document.getElementById('highlight-div');
            if (highlightDiv) {
                highlightDiv.style.top = `${rect.top - container.top + containerRef.current.scrollTop}px`;
                highlightDiv.style.left = `${rect.left - container.left}px`;
                highlightDiv.style.width = `${rect.width}px`;
                highlightDiv.style.height = `${rect.height}px`;
            }
        }
    };

    useEffect(() => {
        updateSelection();
        window.addEventListener('scroll', updateSelection);
        window.addEventListener('resize', updateSelection);

        return () => {
            window.removeEventListener('scroll', updateSelection);
            window.removeEventListener('resize', updateSelection);
        };
    }, [selectedElement]);

    useEffect(() => {
        if (hoveredElement && containerRef.current) {
            const rect = hoveredElement.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            if (hoverDivRef.current) {
                hoverDivRef.current.style.top = `${rect.top - container.top + containerRef.current.scrollTop}px`;
                hoverDivRef.current.style.left = `${rect.left - container.left}px`;
                hoverDivRef.current.style.width = `${rect.width}px`;
                hoverDivRef.current.style.height = `${rect.height}px`;
            }
        }
    }, [hoveredElement]);

    useEffect(() => {
        // Reset selected and hovered elements on component mount
        setSelectedElement(null);
        setHoveredElement(null);
    }, []);

    useEffect(() => {
        // Check state.selectedNode on component mount
        if (state?.seletecedNodeId) {
            setSelectedElement(null);
        }
    }, [state?.seletecedNodeId]);

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onDrag={handleDrag}
            className="relative w-ful h-full bg-neutral-50"
        >
            {children}
            {selectedElement && (
                <div
                    id="highlight-div"
                    className="absolute border-2 border-blue-500 pointer-events-none box-border z-50"
                />
            )}
            <div
                ref={hoverDivRef}
                id="hover-div"
                className="absolute border-2 border-green-500 pointer-events-none box-border z-50"
            />
        </div>
    );
};