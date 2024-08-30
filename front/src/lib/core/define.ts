import {NodeType} from "@/lib/core/node.ts";

export const StackNodeType: NodeType = {
    id: "Stack",
    render: "StackRender",
    defaultProps: {
        css: {
            flex: "flex",
            padding: "p-2",
            space: "",
            corner: "",
            shadow: "",
            font: "",
            color: "",
            background: "",
            border: "",
            width: "w-full",
            height: "h-fit",
            layout: {
                direction: "flex-col",
                position: "justify-start items-start"
            },
        }
    },
    defaultChildren: [],
}

export const LabelNodeType: NodeType = {
    id: "Label",
    render: "LabelRender",
    defaultProps: {
        css: {
            padding: "p-2",
            space: "",
            corner: "",
            shadow: "",
            font: "",
            color: "",
            background: "",
            border: "",
            width: "",
            height: "",
        },
        text: "Label"
    },
    defaultChildren: [],
}

export const SlotNodeType: NodeType = {
    id: "Slot",
    render: "StackRender",
    defaultProps: {
        css: {
            class: " flex flex-col border p-4 bg-blue-50",
        }
    },
    defaultChildren: [],
}

export const ComponentNodeTypeExample = {
    render: "ComponentRender",
    defaultProps: {
        css: {
            width: "w-full",
            height: "h-fill",
        }
    },
}