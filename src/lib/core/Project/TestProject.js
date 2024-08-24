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
    "Brand 600": "brand-600",
}
// 添加属性
AttributeManager.addAttribute(new StyleAttribute({
    id: "spacing",
    name: "Spacing",
    defaultValue: "None",
    mapping: {
        None: "",
        Xs: "gap-1",
        S: "gap-2",
        M: "gap-4",
        L: "gap-6",
        Fill: "justify-between",
    },
    option: {
        editMode: "tab"
    }
}));
AttributeManager.addAttribute(new Attribute({
    id: "text",
    name: "Text",
    defaultValue: "Text",
    option: {
        editMode: "text"
    }
}));
AttributeManager.addAttribute(new StyleAttribute({
    id: "padding",
    name: "Padding",
    defaultValue: "Xs",
    mapping: {
        None: "p-0",
        Xs: "p-1",
        S: "p-2",
        M: "p-4",
        L: "p-6",
    },
    option: {
        editMode: "tab"
    }
}));

AttributeManager.addAttribute(new BackgroundAttribute({
    id: "background",
    name: "Background",
    defaultValue: "None",
    mapping: COLOR_MAPPING,
    option: {
        editMode: "select"
    }
}));

AttributeManager.addAttribute(new ColorAttribute({
    id: "color",
    name: "Color",
    defaultValue: "None",
    mapping: COLOR_MAPPING,
    option: {
        editMode: "select"
    }
}));

AttributeManager.addAttribute(new LayoutStyleAttribute({
    id: "layout",
    name: "Layout",
    defaultValue: "xLeftTop"
}));

// 添加NodeType
NodeTypeManager.addNodeType(new NodeType({
    id: "Page",
    name: 'Stack',
    attributeIds: ["background"],
    defaultValues: {
        background: "red",
    }
}));

NodeTypeManager.addNodeType(new NodeType({
    id: "Stack",
    name: 'Stack',
    attributeIds: ["spacing", "padding", "color", "background"],
    option: {
        allowedEditAttribute: ["background", "color", "padding"],
    }
}));

NodeTypeManager.addNodeType(new NodeType({
    id: "Label",
    name: 'Label',
    attributeIds: ["color", "padding", "text"],
    defaultValues: {
        text: "Label"
    },
    option: {
        canDrop: false,
        allowedEditAttribute: ["text", "color", "padding"],
    }
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