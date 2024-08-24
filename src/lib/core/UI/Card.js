import {
    NodeManager,
    NodeTypeManager,
    AttributeManager,
    StyleAttribute,
    NodeType, ColorAttribute, Attribute
} from "../index.js";

import * as ComAttr from "./CommonAttribute.js";

NodeTypeManager.addNodeType(new NodeType({
    id: "UICard",
    name: 'Stack',
    attributes: [
        ComAttr.title("Card Title"),
        ComAttr.text(),
    ],
    option: {
        render: "UICard",
        canDrop: false,
        canDrag: true,
    }
}));

export default "Card";