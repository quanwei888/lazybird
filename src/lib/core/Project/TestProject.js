import {Project} from "./Project.js";

import {
    NodeManager,
    NodeTypeManager,
    AttributeManager,
    StyleAttribute,
    LayoutStyleAttribute, NodeType, BackgroundAttribute, ColorAttribute, Attribute
} from "../index.js";


const COLOR_MAPPING = {
    None: "",
    "Brand 50": "brand-50",
    "Brand 100": "brand-100",
    "Brand 200": "brand-200",
    "Brand 300": "brand-300",
    "Brand 400": "brand-400",
    "Brand 500": "brand-500",
    "Brand 600": "brand-600",
    "Brand 800": "brand-800",
    "Brand 900": "brand-900",
}
// 添加属性
AttributeManager.addAttribute(new StyleAttribute("spacing", "Spacing", "None", {
    None: "",
    Xs: "gap-1",
    S: "gap-2",
    M: "gap-4",
    L: "gap-6",
    Fill: "justify-between",
}));
AttributeManager.addAttribute(new Attribute("text", "Text", "Text", {
    editMode: "text"
}));
AttributeManager.addAttribute(new StyleAttribute(
    "padding",
    "Padding",
    "Xs",
    {
        None: "p-0",
        Xs: "p-1",
        S: "p-2",
        M: "p-4",
        L: "p-6",
    },
    {
        editMode: "tab"
    }));

AttributeManager.addAttribute(new BackgroundAttribute(
    "background",
    "Background",
    "None",
    COLOR_MAPPING,
    {
        editMode: "select"
    }));

AttributeManager.addAttribute(new ColorAttribute(
    "color",
    "Color",
    "None",
    COLOR_MAPPING,
    {
        editMode: "select"
    }));

AttributeManager.addAttribute(new LayoutStyleAttribute("layout", "Layout", "xLeftTop"));

// 添加NodeType
NodeTypeManager.addNodeType(new NodeType("Page", 'Stack', ["background"], {
    background: "red",
}));

NodeTypeManager.addNodeType(new NodeType(
    "Stack",
    'Stack',
    ["spacing", "padding", "color", "background"],
    {},
    [],
    {
        allowedEditAttribute: ["background", "color", "padding"],
    }));

NodeTypeManager.addNodeType(new NodeType(
    "Label",
    'Label',
    ["color", "padding", "text"],
    {
        text: "Label"
    },
    [],
    {
        canDrop: false,
        allowedEditAttribute: ["text", "color", "padding"],
    }));

export const testProject = new Project();
export const loadProject = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testProject);
        }, 100); // 模拟 1 秒的网络延迟
    });
};

const page = NodeTypeManager.getNodeType("Page").createNode();
testProject.pages.push(page);
testProject.currentPage = page;

const child1 = NodeTypeManager.getNodeType("Stack").createNode({layout: 'xLeftTop'});
NodeManager.insertNode(child1.id, page.id);

//const child2 = NodeTypeManager.getNodeType("Label").createNode();
NodeManager.insertNode(NodeTypeManager.getNodeType("Stack").createNode().id, page.id);