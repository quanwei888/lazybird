import {expect} from 'chai';
import {Attribute, EnumAttribute, MappedAttribute, StyleAttribute} from '../Attribute/index.js';

describe('Attribute', () => {
    describe('Attribute', () => {
        it('should create an Attribute instance', () => {
            const attr = new Attribute({name: 'TestAttribute', value: 'default'});
            expect(attr.name).to.equal('TestAttribute');
            expect(attr.value).to.equal('default');
        });

        it('should set default value', () => {
            const attr = new Attribute({name: 'TestAttribute', value: 'default'});
            attr.setDefaultValue('newDefault');
            expect(attr.value).to.equal('newDefault');
        });

        it('should set name', () => {
            const attr = new Attribute({name: 'TestAttribute', value: 'default'});
            attr.setName('NewName');
            expect(attr.name).to.equal('NewName');
        });
    });

    describe('EnumAttribute', () => {
        it('should create an EnumAttribute instance', () => {
            const enumAttr = new EnumAttribute({name: 'EnumAttribute', value: 'value1', allowedValues: ['value1', 'value2']});
            expect(enumAttr.name).to.equal('EnumAttribute');
            expect(enumAttr.value).to.equal('value1');
            expect(enumAttr.allowedValues).to.include('value1');
            expect(enumAttr.allowedValues).to.include('value2');
        });

        it('should validate values correctly', () => {
            const enumAttr = new EnumAttribute({name: 'EnumAttribute', value: 'value1', allowedValues: ['value1', 'value2']});
            expect(enumAttr.isValid('value1')).to.be.true;
            expect(enumAttr.isValid('value3')).to.be.false;
        });
    });

    describe('MappedAttribute', () => {
        it('should create a MappedAttribute instance', () => {
            const mapping = {key1: 'mappedValue1', key2: 'mappedValue2'};
            const mappedAttr = new MappedAttribute({name: 'MappedAttribute', value: 'key1', mapping});
            expect(mappedAttr.name).to.equal('MappedAttribute');
            expect(mappedAttr.value).to.equal('key1');
            expect(mappedAttr.mapping).to.deep.equal(mapping);
        });

        it('should get mapped value correctly', () => {
            const mapping = {key1: 'mappedValue1', key2: 'mappedValue2'};
            const mappedAttr = new MappedAttribute({name: 'MappedAttribute', value: 'key1', mapping});
            expect(mappedAttr.getMappedValue('key1')).to.equal('mappedValue1');
            expect(mappedAttr.getMappedValue('key3')).to.be.null;
        });
    });

    describe('StyleAttribute', () => {
        it('should create a StyleAttribute instance', () => {
            const styleAttr = new StyleAttribute({name: 'StyleAttribute', value: 'default', mapping: {default: 'class1'}});
            expect(styleAttr.name).to.equal('StyleAttribute');
            expect(styleAttr.value).to.equal('default');
        });

        it('should get class name correctly', () => {
            const styleAttr = new StyleAttribute({name: 'StyleAttribute', value: 'default', mapping: {default: 'class1'}});
            expect(styleAttr.getClassName('default')).to.equal('class1');
        });
    });
});