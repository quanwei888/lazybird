import {
    BackgroundAttribute,
    ColorAttribute,
    LayoutAttribute,
    PropsAttribute,
    MapStyleAttribute
} from "../Attribute/index.js";


export const title = (value = "this is a title") => new PropsAttribute({
    name: "title",
    value: value,
    option: { editMode: "text", group: "Property" }
});

export const text = (value = "Hello World") => new PropsAttribute({
    id:"text",
    name: "text",
    value: value,
    option: { editMode: "text", group: "Property" }
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
export const color = (value = "None") => new ColorAttribute({
    id: "color",
    name: "color",
    value: value,
    mapping: colorMapping,
    option: { editMode: "color", group: "Color" }
})

export const background = (value = "None") => new BackgroundAttribute({
    id: "background",
    name: "background",
    value: value,
    mapping: colorMapping,
    option: { editMode: "color", group: "Color" }
})

export const padding = (value = "None") => new MapStyleAttribute({
    id: "padding",
    name: "padding",
    value: value,
    mapping: {
        "None": "",
        "S": "p-2",
        "M": "p-4",
        "L": "p-8",
    },
    option: { editMode: "tab", group: "Style" }
})


export const border = (value = "None") => new MapStyleAttribute({
    id: "border",
    name: "border",
    value: value,
    mapping: {
        "None": "",
        "Primary": "border border-primary",
        "Neutral": "border border-neutral-200",

    },
    option: { editMode: "tab", group: "Style" }
})

export const width = (value = "Hug") => new MapStyleAttribute({
    id: "width",
    name: "width",
    value: value,
    mapping: {
        "Hug": "w-fit",
        "Fill": "w-full",
    },
    option: { editMode: "tab", group: "Size" }
})

export const height = (value = "Hug") => new MapStyleAttribute({
    id: "height",
    name: "height",
    value: value,
    mapping: {
        "Hug": "h-fit",
        "Fill": "h-full",
    },
    option: { editMode: "tab", group: "Size" }
})

export const layout = (
    value = {
        direction: "flex-col",
        position: "justify-start items-start"
    }) => new LayoutAttribute({
        name: "layout",
        value: value,
        mapping: {},
        option: { editMode: "layout", group: "Style" }
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
    option: { editMode: "tab", group: "Style" }
})

export const corner = (value = "None") => new MapStyleAttribute({
    id: "corner",
    name: "corner",
    value: value,
    mapping: {
        "None": "",
        "S": "rounded-sm",
        "M": "rounded-md",
        "L": "rounded-lg",
    },
    option: { editMode: "tab", group: "Style" }
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
    option: { editMode: "tab", group: "Style" }
})