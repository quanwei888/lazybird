import { useDragLayer, XYCoord } from "react-dnd";
import React from "react";

interface DragLayerMonitor {
    item: any;
    itemType: string | symbol | null;
    initialOffset: XYCoord | null;
    currentOffset: XYCoord | null;
    isDragging: boolean;
}

export const CustomDragLayer: React.FC = () => {

    function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
        if (!initialOffset || !currentOffset) {
            return {
                display: "none",
            };
        }
        let { x, y } = currentOffset;
        const transform = `translate(${x}px, ${y}px)`;
        return {
            transform,
            WebkitTransform: transform,
        };
    }

    const { itemType, isDragging, item, initialOffset, currentOffset } =
        useDragLayer<DragLayerMonitor>((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }));

    if (!item) {
        return null;
    }

    const layerStyles: React.CSSProperties = {
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
    };
    const styles: React.CSSProperties = {
        display: "inline-block",
        width: item.width,
        height: item.height,
    };

    if (!isDragging) {
        return null;
    }
    return (
        <div id="DragLayer" style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset)}
            >
                <div style={styles} className="border border-dotted border-blue-500">
                </div>
            </div>
        </div>
    );
};