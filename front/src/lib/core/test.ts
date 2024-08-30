import * as Core from "./node.ts";
import * as Def from "./define.ts";

const project = Core.project
project.id = "project 1";


const child1 = Core.createNode(Def.StackNodeType);
const child2 = Core.createNode(Def.LabelNodeType);
const child3 = Core.createNode(Def.SlotNodeType);

const pageId = "page 1";
Core.addPage(pageId);
const rootNode = Core.getNode(Core.getPage(pageId).rootId!);
Core.insertNode(child1, rootNode);
Core.insertNode(child2, rootNode);
Core.insertNode(child3, rootNode);
Core.switchDesign(pageId);
Core.printTree(rootNode);

Object.values(project.nodes).forEach(node => {
    console.log(node.id,
        "canEdit:",Core.canEdit(node),
        "canDrag:",Core.canDragNode(node),
        "canDrop:",Core.canDropNode(undefined,node),
    );
})
//console.log(Core.findFirstDropableNode(undefined, child2))
//console.log(Core.findFirstDropableNode(undefined, child3))
Core.insertNode(child3, rootNode,1);
//console.log(JSON.stringify(rootNode, null, 2));
//console.log(rootNode)
Core.insertNode(child3, child1,1);
//console.log(rootNode)
//console.log(child1)
//console.log(JSON.stringify(page, null, 2));
