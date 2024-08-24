import { expect } from 'chai';
import { AttributeManager, Attribute, EnumAttribute, MappedAttribute } from '../Attribute/index.js';

describe('AttributeManager', () => {
    beforeEach(() => {
        // Clear the attributes map before each test
        AttributeManager.attributes.clear();
    });

    it('should add an Attribute instance', () => {
        const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
        AttributeManager.addAttribute(attr);
        expect(AttributeManager.getAttribute('1')).to.equal(attr);
    });

    it('should add an EnumAttribute instance', () => {
        const enumAttr = new EnumAttribute({id: '2', name: 'EnumAttribute', defaultValue: 'value1', allowedValues: ['value1', 'value2']});
        AttributeManager.addAttribute(enumAttr);
        expect(AttributeManager.getAttribute('2')).to.equal(enumAttr);
    });

    it('should add a MappedAttribute instance', () => {
        const mapping = {key1: 'mappedValue1', key2: 'mappedValue2'};
        const mappedAttr = new MappedAttribute({id: '3', name: 'MappedAttribute', defaultValue: 'key1', mapping});
        AttributeManager.addAttribute(mappedAttr);
        expect(AttributeManager.getAttribute('3')).to.equal(mappedAttr);
    });

    it('should not add an attribute with duplicate id', () => {
        const attr1 = new Attribute({id: '1', name: 'TestAttribute1', defaultValue: 'default1'});
        const attr2 = new Attribute({id: '1', name: 'TestAttribute2', defaultValue: 'default2'});
        AttributeManager.addAttribute(attr1);
        AttributeManager.addAttribute(attr2);
        expect(AttributeManager.getAttribute('1')).to.equal(attr1);
    });

    it('should get an attribute by id', () => {
        const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
        AttributeManager.addAttribute(attr);
        const retrievedAttr = AttributeManager.getAttribute('1');
        expect(retrievedAttr).to.equal(attr);
    });

    it('should remove an attribute by id', () => {
        const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
        AttributeManager.addAttribute(attr);
        AttributeManager.removeAttribute('1');
        expect(AttributeManager.getAttribute('1')).to.be.undefined;
    });

    it('should return undefined for non-existent attribute', () => {
        const retrievedAttr = AttributeManager.getAttribute('nonExistentId');
        expect(retrievedAttr).to.be.undefined;
    });
});