import {
    BackgroundAttribute,
    ColorAttribute,
    LayoutAttribute,
    PropsAttribute,
    NodeManager,
    MapStyleAttribute,
    SizeAttribute,
    NodeType,
    NodeTypeManager,
    ComponentNodeType,
    ChildrenAttribute,
    Project,
    Attribute
} from "./index.ts";
import * as Api from "../../api/api.ts";
import {PlainBase} from "../utils.ts";


export const title = (value = "this is a title") => new PropsAttribute({
    name: "title",
    value: value,
    option: {editMode: "text", group: "Property"}
});

export const text = (value = "Hello World") => new PropsAttribute({
    name: "text",
    value: value,
    option: {editMode: "text", group: "Property"}
});

const colorMapping = {
    "None": "",
    "gray-50": "gray-50",
    "gray-100": "gray-100",
    "gray-200": "gray-200",
    "gray-300": "gray-300",
    "gray-400": "gray-400",
    "gray-500": "gray-500",
    "gray-600": "gray-600",
    "gray-700": "gray-700",
    "gray-800": "gray-800",
    "gray-900": "gray-900",
}
export const color = (value = "gray-700") => new ColorAttribute({
    name: "color",
    value: value,
    mapping: colorMapping,
    option: {editMode: "color", group: "Color"}
})

export const background = (value = "None") => new BackgroundAttribute({
    name: "background",
    value: value,
    mapping: colorMapping,
    option: {editMode: "color", group: "Color"}
})

export const padding = (value = "S") => new MapStyleAttribute({
    name: "padding",
    value: value,
    mapping: {
        "None": "",
        "S": "p-2",
        "M": "p-4",
        "L": "p-8",
    },
    option: {editMode: "tab", group: "Style"}
})


export const border = (value = "Neutral") => new MapStyleAttribute({
    name: "border",
    value: value,
    mapping: {
        "None": "",
        "Primary": "border border-primary",
        "Neutral": "border border-neutral-200",

    },
    option: {editMode: "tab", group: "Style"}
})

export const width = (value = {tag: "Fill", size: "0"}) => new SizeAttribute({

    name: "width",
    value: value,
    option: {editMode: "size", cssPrefix: "w", group: "Size"}
})

export const height = (value = {tag: "Hug", size: "0"}) => new SizeAttribute({

    name: "height",
    value: value,
    option: {editMode: "size", cssPrefix: "h", group: "Size"}
})

export const layout = (
    value = {
        direction: "flex-col",
        position: "justify-start items-start"
    }) => new LayoutAttribute({
    name: "layout",
    value: value,
    option: {editMode: "layout", group: "Style"}
})

export const space = (value = "None") => new MapStyleAttribute({

    name: "space",
    value: value,
    mapping: {
        "None": "",
        "S": "space-y-2",
        "M": "space-y-4",
        "L": "space-y-8",
    },
    option: {editMode: "tab", group: "Style"}
})

export const corner = (value = "M") => new MapStyleAttribute({

    name: "corner",
    value: value,
    mapping: {
        "None": "",
        "S": "rounded-sm",
        "M": "rounded-md",
        "L": "rounded-lg",
    },
    option: {editMode: "tab", group: "Style"}
})

export const shadow = (value = "None") => new MapStyleAttribute({

    name: "shadow",
    value: value,
    mapping: {
        "None": "",
        "S": "shadow-sm",
        "M": "shadow-md",
        "L": "shadow-lg",
    },
    option: {editMode: "tab", group: "Style"}
})

export const font = (value = "M") => new MapStyleAttribute({

    name: "font",
    value: value,
    mapping: {
        "XS": "text-sm",
        "S": "text-sm",
        "M": "text-md",
        "L": "text-lg",
        "XL": "text-xl",
    },
    option: {editMode: "tab", group: "Style"}
})
export const bold = (value = "Normal") => new MapStyleAttribute({

    name: "bold",
    value: value,
    mapping: {
        "Normal": "font-normal",
        "Bold": "font-bold",
    },
    option: {editMode: "tab", group: "Style"}
})

const StackAttributes = {
    layout: layout(),
    space: space(),
    padding: padding(),

    color: color(),
    background: background(),

    width: width(),
    height: height(),

    border: border(),
    corner: corner(),
    shadow: shadow(),

}

export const Stack = new NodeType({
    id: 0,
    name: '@Stack',
    attributes: StackAttributes,
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
        icon: "LayoutIcon"
    }
})

export const Label = new NodeType({
    id: 0,
    name: '@Label',
    attributes: {
        font: font(),
        bold: bold(),
        color: color(),
        background: background(),
        text: text()
    },
    option: {
        render: "UILabel",
        canDrop: false,
        canDrag: true,
        icon: "LayoutIcon"
    }
})

export const Page = new ComponentNodeType({
    id: 0,
    name: '@Page',
    attributes: {
        ...StackAttributes,
        children: new ChildrenAttribute([])
    },
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
    }
})
export const Component = new ComponentNodeType({
    id: 0,
    name: '@Component',
    attributes: {
        ...StackAttributes,
        children: new ChildrenAttribute([])
    },
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
    }
})

export const Example = new NodeType({
    id: 0,
    name: '@Example',
    attributes: {
        ...StackAttributes,
        children: new ChildrenAttribute([])
    },
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
    }
})

export const SystemNodeTypes = [Page, Component, Stack, Label, Example]
