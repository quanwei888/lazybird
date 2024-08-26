import {
    BackgroundAttribute,
    ColorAttribute,
    LayoutAttribute,
    PropsAttribute,
    MapStyleAttribute, SizeAttribute
} from "../Attribute/index.js";


export const title = (value = "this is a title") => new PropsAttribute({
    name: "title",
    value: value,
    option: {editMode: "text", group: "Property"}
});

export const text = (value = "Hello World") => new PropsAttribute({
    id: "text",
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
    id: "color",
    name: "color",
    value: value,
    mapping: colorMapping,
    option: {editMode: "color", group: "Color"}
})

export const background = (value = "None") => new BackgroundAttribute({
    id: "background",
    name: "background",
    value: value,
    mapping: colorMapping,
    option: {editMode: "color", group: "Color"}
})

export const padding = (value = "S") => new MapStyleAttribute({
    id: "padding",
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
    id: "border",
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
    id: "width",
    name: "width",
    value: value,
    option: {editMode: "size", cssPrefix: "w", group: "Size"}
})

export const height = (value = {tag: "Hug", size: "0"}) => new SizeAttribute({
    id: "height",
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
    mapping: {},
    option: {editMode: "layout", group: "Style"}
})

export const space = (value = "None") => new MapStyleAttribute({
    id: "space",
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
    id: "corner",
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
    id: "shadow",
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
    id: "font",
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
    id: "bold",
    name: "bold",
    value: value,
    mapping: {
        "Normal": "font-normal",
        "Bold": "font-bold",
    },
    option: {editMode: "tab", group: "Style"}
})
