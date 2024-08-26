import { ComponentNodeType, NodeManager, NodeType, NodeTypeManager } from "../Node/index.js";
import { ChildrenAttribute } from "../Attribute/index.js";
import * as ComAttr from "./attributes.js";
import { space } from "./attributes.js";


const StackAttributes = [
    ComAttr.layout(),
    ComAttr.space(),
    ComAttr.padding("S"),

    ComAttr.color(),
    ComAttr.background(),

    ComAttr.width("Fill"),
    ComAttr.height(),

    ComAttr.border("Neutral"),
    ComAttr.corner(),
    ComAttr.shadow(),

]

export const Stack = new NodeType({
    id: "Stack",
    name: 'Stack',
    attributes: StackAttributes,
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
        icon: "LayoutIcon"
    }
})
NodeTypeManager.addNodeType(Stack);

export const Label = new NodeType({
    id: "Label",
    name: 'Label',
    attributes: [
        ComAttr.width(),
        ComAttr.height(),
        ComAttr.font(),
        ComAttr.bold(),
        ComAttr.color(),
        ComAttr.background(),
        ComAttr.text()
    ],
    option: {
        render: "UILabel",
        canDrop: false,
        canDrag: true,
        icon: "LayoutIcon"
    }
})
NodeTypeManager.addNodeType(Label);

const root = Stack.createNode();
NodeManager.insertNode(Stack.createNode().id, root.id)
const children = [
    root.id
]

export const Component = new ComponentNodeType({
    id: "Component",
    name: 'Component',
    attributes: [
        ComAttr.height(),
        ComAttr.width(),
        new ChildrenAttribute(children)],
    option: {
        render: "UIStack",
        canDrop: false,
        canDrag: true,
    }
})
NodeTypeManager.addNodeType(Component);


export const CardExample = new NodeType({
    id: "CardExample",
    name: 'CardExample',
    attributes: [
        ...StackAttributes,
        new ChildrenAttribute(children)],
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
    }
})
NodeTypeManager.addNodeType(CardExample);