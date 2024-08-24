import {
    NodeTypeManager,
    NodeType
} from "../Node/index.js";
import * as ComAttr from "./CommonAttribute.js";


const nodeType = new NodeType({
    id: "UIPage",
    name: 'Page',
    attributes: [
        ComAttr.text(),
    ],
    option: {
        render: "UIStack",
        canDrop: true,
        canDrag: true,
    }
})
NodeTypeManager.addNodeType(nodeType);

export default nodeType;