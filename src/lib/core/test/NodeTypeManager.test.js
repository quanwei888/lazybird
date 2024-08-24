import { expect } from 'chai';
import { NodeTypeManager, NodeType } from '../Node/index.js';
import { AttributeManager, Attribute } from '../Attribute/index.js';
import sinon from 'sinon';

describe('NodeTypeManager', () => {
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
    });

    after(() => {
        sinon.restore();
    });

    it('should add a NodeType', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);

        expect(NodeTypeManager.getNodeType('1')).to.equal(nodeType);
    });

    it('should throw an error when adding a NodeType with duplicate id', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);

        expect(() => NodeTypeManager.addNodeType(nodeType)).to.throw(Error, 'NodeType with id 1 already exists.');
    });

    it('should remove a NodeType', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);
        NodeTypeManager.removeNodeType('1');

        expect(NodeTypeManager.getNodeType('1')).to.be.undefined;
    });

    it('should add an attribute to a NodeType', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);
        NodeTypeManager.addAttributeToType('1', 'attr2', 'custom_default');

        expect(nodeType.attributes).to.have.lengthOf(2);
        expect(nodeType.defaultValues['attr2']).to.equal('custom_default');
    });

    it('should remove an attribute from a NodeType', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1', 'attr2']
        });
        NodeTypeManager.addNodeType(nodeType);
        NodeTypeManager.removeAttributeFromType('1', 'attr2');

        expect(nodeType.attributes).to.have.lengthOf(1);
        expect(nodeType.defaultValues['attr2']).to.be.undefined;
    });

    it('should update an attribute for a NodeType', () => {
        const nodeType = new NodeType({
            id: '1',
            name: 'TestNodeType',
            attributeIds: ['attr1']
        });
        NodeTypeManager.addNodeType(nodeType);
        NodeTypeManager.updateAttributeForType('1', 'attr1', 'new_default');

        expect(nodeType.defaultValues['attr1']).to.equal('new_default');
    });
});