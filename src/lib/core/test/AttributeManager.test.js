import { expect } from 'chai';
import { AttributeManager, Attribute } from '../Attribute/index.js';

describe('AttributeManager', () => {
    beforeEach(() => {
        // Clear the attributes map before each test
        AttributeManager.attributes.clear();
    });

    it('should add an attribute', () => {
        const attr = new Attribute('1', 'TestAttribute', 'default');
        AttributeManager.addAttribute(attr);
        expect(AttributeManager.getAttribute('1')).to.equal(attr);
    });

    it('should not add an attribute with duplicate id', () => {
        const attr1 = new Attribute('1', 'TestAttribute1', 'default1');
        const attr2 = new Attribute('1', 'TestAttribute2', 'default2');
        AttributeManager.addAttribute(attr1);
        AttributeManager.addAttribute(attr2);
        expect(AttributeManager.getAttribute('1')).to.equal(attr1);
    });

    it('should get an attribute by id', () => {
        const attr = new Attribute('1', 'TestAttribute', 'default');
        AttributeManager.addAttribute(attr);
        const retrievedAttr = AttributeManager.getAttribute('1');
        expect(retrievedAttr).to.equal(attr);
    });

    it('should remove an attribute by id', () => {
        const attr = new Attribute('1', 'TestAttribute', 'default');
        AttributeManager.addAttribute(attr);
        AttributeManager.removeAttribute('1');
        expect(AttributeManager.getAttribute('1')).to.be.undefined;
    });

    it('should return undefined for non-existent attribute', () => {
        const retrievedAttr = AttributeManager.getAttribute('nonExistentId');
        expect(retrievedAttr).to.be.undefined;
    });
});