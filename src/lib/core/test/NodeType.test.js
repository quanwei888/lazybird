import {expect} from 'chai';
import {Node, NodeTypeManager, NodeType, NodeManager} from '../Node/index.js';
import {AttributeManager, Attribute} from '../Attribute/index.js';
import sinon from 'sinon';

describe('NodeType', () => {
    before(() => {
        NodeTypeManager.nodeTypes.clear();
        sinon.stub(AttributeManager, 'getAttribute').callsFake(id => ({
            id,
            defaultValue: `default_${id}`,
            isValid: value => typeof value === 'string'
        }));
    });
    beforeEach(() => {
        NodeTypeManager.nodeTypes.clear();
        NodeManager.nodes.clear();
    });

    after(() => {
        sinon.restore();
    });

    it('should create a node with default values', () => {
        const nodeType = new NodeType({
            id: 1,
            name: 'TestNodeType',
            attributeIds: ['attr1', 'attr2']
        });
        NodeTypeManager.addNodeType(nodeType);
        const node = nodeType.createNode();

        expect(node.getAttribute('attr1')).to.equal('default_attr1');
        expect(node.getAttribute('attr2')).to.equal('default_attr2');
    });

    it('should update node with default values', () => {
        const nodeType = new NodeType({
            id: 1,
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);
        const node = new Node(1, 1);
        nodeType.updateNode(node);

        expect(node.getAttribute('attr1')).to.equal('default_attr1');
    });

    it('should clone default children', () => {
        const childNodeType = new NodeType({
            id: 1,
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(childNodeType);
        const childNode = childNodeType.createNode();

        const nodeType = new NodeType({
            id: 2,
            name: 'TestNodeType',
            defaultChildren: [childNode.id]
        });
        NodeTypeManager.addNodeType(nodeType);
        const clonedChildren = nodeType.cloneDefaultChildren();

        expect(clonedChildren).to.have.lengthOf(1);
        expect(clonedChildren[0].id).not.to.equal(childNode.id);
    });

    it('should set and get default values', () => {
        const nodeType = new NodeType({
            id: 1,
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);
        nodeType.setDefaultValues({attr1: 'new_default'});

        expect(nodeType.getDefaultValues().attr1).to.equal('new_default');
    });

    it('should set and get default children', () => {
        const childNode = new Node(2, 1);
        const nodeType = new NodeType({
            id: 1,
            name: 'TestNodeType',
            defaultChildren: [childNode]
        });
        NodeTypeManager.addNodeType(nodeType);
        nodeType.setDefaultChildren([childNode]);

        expect(nodeType.getDefaultChildren()).to.have.lengthOf(1);
        expect(nodeType.getDefaultChildren()[0].id).to.equal(childNode.id);
    });

    it('默认属性与 Attribute 不一样', () => {
        AttributeManager.addAttribute(new Attribute("text", "Text", "Text", {
            editMode: "text"
        }));
        NodeTypeManager.addNodeType(new NodeType({
            id: "Label",
            name: 'Label',
            attributeIds: ["text"],
            defaultValues: {
                text: "Label"
            },
            option: {
                canDrop: false,
                allowedEditAttribute: ["text", "color", "padding"],
            }
        }));

        const node = NodeTypeManager.getNodeType("Label").createNode();

        expect(node.getAttribute('text')).to.equal("Label");
    });
});