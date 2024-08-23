import { expect } from 'chai';
import { Node, NodeTypeManager, NodeManager, NodeType } from '../Node/index.js';
import { AttributeManager, Attribute } from '../Attribute/index.js';

describe('NodeManager', () => {
    before(() => {
        // Setup mock attributes
        AttributeManager.addAttribute(new Attribute('attr1', 'Attribute 1', 'default1'));
        AttributeManager.addAttribute(new Attribute('attr2', 'Attribute 2', 'default2'));
        
        // Setup mock NodeType
        const nodeType = new NodeType('type1', 'TestNodeType', [
            'attr1',
            'attr2',
        ]);
        NodeTypeManager.addNodeType(nodeType);
    });
    beforeEach(() => {
        //NodeTypeManager.nodeTypes.clear();
        NodeManager.nodes.clear();
    });

    after(() => {
        // Cleanup
        AttributeManager.attributes.clear();
        NodeTypeManager.nodeTypes.clear();
    });

    it('should add a node', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node = nodeType.createNode('1');
        expect(NodeManager.getNode(node.id)).to.equal(node);
    });

    it('should not add a node with duplicate id', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node = nodeType.createNode('1');
        NodeManager.addNode(node);
        NodeManager.addNode(node);
        expect(NodeManager.nodes.size).to.equal(1);
    });

    it('should remove a node', () => {
        const nodeType = NodeTypeManager.getNodeType('type1');
        const node = nodeType.createNode('1');
        NodeManager.addNode(node);
        NodeManager.removeNode('1');
        expect(NodeManager.getNode('1')).to.be.undefined;
    });

});