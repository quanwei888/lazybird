import { expect } from 'chai';
import { Node, NodeTypeManager, NodeManager } from '../Node/index.js';
import { AttributeManager, Attribute } from '../Attribute/index.js';

describe('Node', () => {
    before(() => {
        // Setup mock attributes
        AttributeManager.addAttribute(new Attribute({id: 'attr1', name: 'Attribute 1', defaultValue: 'default1'}));
        AttributeManager.addAttribute(new Attribute({id: 'attr2', name: 'Attribute 2', defaultValue: 'default2'}));
        
        // Setup mock NodeType
        const nodeType = {
            id: 'type1',
            attributes: [
                AttributeManager.getAttribute('attr1'),
                AttributeManager.getAttribute('attr2')
            ],
            defaultValues: {
                attr1: 'default1',
                attr2: 'default2'
            },
            updateNode: function(node) {
                node.attributes['attr1'] = node.attributes['attr1'] || this.defaultValues['attr1'];
                node.attributes['attr2'] = node.attributes['attr2'] || this.defaultValues['attr2'];
            }
        };
        NodeTypeManager.addNodeType(nodeType);
    });
    beforeEach(() => {
        NodeManager.nodes.clear();
    });

    after(() => {
        // Cleanup
        AttributeManager.attributes.clear();
        NodeTypeManager.nodeTypes.clear();
    });

    it('should create a Node instance', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        expect(node).to.be.an.instanceof(Node);
        expect(node.id).to.equal('1');
        expect(node.nodeTypeId).to.equal('type1');
    });

    it('should set and get attributes correctly', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        node.setAttribute('attr1', 'value1');
        expect(node.getAttribute('attr1')).to.equal('value1');
    });

    it('should throw an error for invalid attribute', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        expect(() => node.setAttribute('invalidAttr', 'value')).to.throw(Error, 'Attribute with id invalidAttr is not defined in NodeType type1.');
    });

    it('should throw an error for invalid attribute value', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        const invalidAttribute = new Attribute({id: 'invalidAttr', name: 'Invalid Attribute', defaultValue: 'default'});
        invalidAttribute.isValid = () => false;
        AttributeManager.addAttribute(invalidAttribute);
        NodeTypeManager.getNodeType('type1').attributes.push(invalidAttribute);
        expect(() => node.setAttribute('invalidAttr', 'value')).to.throw(Error, 'Invalid value for attribute invalidAttr.');
    });

    it('should handle circular references in getAttribute', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        node.attributes['attr1'] = '{{attr2}}';
        node.attributes['attr2'] = '{{attr1}}';
        expect(() => node.getAttribute('attr1')).to.throw(Error, 'Circular reference detected for attribute: {{attr2}}');
    });

    it('should remove a node', () => {
        const node = new Node({id: '1', nodeTypeId: 'type1'});
        NodeManager.addNode(node);
        NodeManager.removeNode('1');
        expect(NodeManager.getNode('1')).to.be.undefined;
    });
});