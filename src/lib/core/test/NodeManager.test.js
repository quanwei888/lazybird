import {expect} from 'chai';
import {Node, NodeTypeManager, NodeManager, NodeType} from '../Node/index.js';
import {AttributeManager, Attribute} from '../Attribute/index.js';

describe('NodeManager', () => {
    before(() => {
        // Setup mock attributes
        AttributeManager.addAttribute(new Attribute({id: 'attr1', name: 'Attribute 1', defaultValue: 'default1'}));
        AttributeManager.addAttribute(new Attribute({id: 'attr2', name: 'Attribute 2', defaultValue: 'default2'}));

        // Setup mock NodeType
        const nodeType = new NodeType({
            id: 'type1',
            name: 'TestNodeType',
            attributeIds: [
                'attr1',
                'attr2',
            ]
        });
        NodeTypeManager.addNodeType(nodeType);
    });
    beforeEach(() => {
        NodeManager.nodes.clear();
    });

    after(() => {
    });

    it('should add a node', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node = nodeType.createNode();
        NodeManager.addNode(node);
        expect(NodeManager.getNode(node.id)).to.equal(node);
    });

    it('should not add a node with duplicate id', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node1 = nodeType.createNode();
        const node2 = nodeType.createNode();
        node2.id = node1.id; // Force duplicate id
        NodeManager.addNode(node1);
        NodeManager.addNode(node2);
        expect(NodeManager.nodes.size).to.equal(1);
    });

    it('should remove a node', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node = nodeType.createNode();
        NodeManager.addNode(node);
        NodeManager.removeNode(node.id);
        expect(NodeManager.getNode(node.id)).to.be.undefined;
    });

});