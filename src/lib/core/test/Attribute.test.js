import {expect} from 'chai';
import {Attribute, EnumAttribute, MappedAttribute, StyleAttribute, LayoutStyleAttribute} from '../Attribute/index.js';

describe('Attribute', () => {
    describe('Attribute', () => {
        it('should create an Attribute instance', () => {
            const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
            expect(attr.id).to.equal('1');
            expect(attr.name).to.equal('TestAttribute');
            expect(attr.defaultValue).to.equal('default');
        });

        it('should set default value', () => {
            const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
            attr.setDefaultValue('newDefault');
            expect(attr.defaultValue).to.equal('newDefault');
        });

        it('should set name', () => {
            const attr = new Attribute({id: '1', name: 'TestAttribute', defaultValue: 'default'});
            attr.setName('NewName');
            expect(attr.name).to.equal('NewName');
        });
    });

    describe('EnumAttribute', () => {
        it('should create an EnumAttribute instance', () => {
            const enumAttr = new EnumAttribute({id: '2', name: 'EnumAttribute', defaultValue: 'value1', allowedValues: ['value1', 'value2']});
            expect(enumAttr.id).to.equal('2');
            expect(enumAttr.name).to.equal('EnumAttribute');
            expect(enumAttr.defaultValue).to.equal('value1');
            expect(enumAttr.allowedValues).to.include('value1');
            expect(enumAttr.allowedValues).to.include('value2');
        });

        it('should validate values correctly', () => {
            const enumAttr = new EnumAttribute({id: '2', name: 'EnumAttribute', defaultValue: 'value1', allowedValues: ['value1', 'value2']});
            expect(enumAttr.isValid('value1')).to.be.true;
            expect(enumAttr.isValid('value3')).to.be.false;
        });
    });

    describe('MappedAttribute', () => {
        it('should create a MappedAttribute instance', () => {
            const mapping = {key1: 'mappedValue1', key2: 'mappedValue2'};
            const mappedAttr = new MappedAttribute({id: '3', name: 'MappedAttribute', defaultValue: 'key1', mapping});
            expect(mappedAttr.id).to.equal('3');
            expect(mappedAttr.name).to.equal('MappedAttribute');
            expect(mappedAttr.defaultValue).to.equal('key1');
            expect(mappedAttr.mapping).to.deep.equal(mapping);
        });

        it('should get mapped value correctly', () => {
            const mapping = {key1: 'mappedValue1', key2: 'mappedValue2'};
            const mappedAttr = new MappedAttribute({id: '3', name: 'MappedAttribute', defaultValue: 'key1', mapping});
            expect(mappedAttr.getMappedValue('key1')).to.equal('mappedValue1');
            expect(mappedAttr.getMappedValue('key3')).to.be.null;
        });
    });

    describe('StyleAttribute', () => {
        it('should create a StyleAttribute instance', () => {
            const styleAttr = new StyleAttribute({id: '4', name: 'StyleAttribute', defaultValue: 'default', mapping: {default: 'class1'}});
            expect(styleAttr.id).to.equal('4');
            expect(styleAttr.name).to.equal('StyleAttribute');
            expect(styleAttr.defaultValue).to.equal('default');
        });

        it('should get class name correctly', () => {
            const styleAttr = new StyleAttribute({id: '4', name: 'StyleAttribute', defaultValue: 'default', mapping: {default: 'class1'}});
            expect(styleAttr.getClassName('default')).to.equal('class1');
        });
    });

    describe('LayoutStyleAttribute', () => {
        it('should create a LayoutStyleAttribute instance', () => {
            const layoutAttr = new LayoutStyleAttribute({id: '5', name: 'LayoutStyleAttribute', defaultValue: 'xLeftTop'});
            expect(layoutAttr.id).to.equal('5');
            expect(layoutAttr.name).to.equal('LayoutStyleAttribute');
            expect(layoutAttr.defaultValue).to.equal('xLeftTop');
        });

        it('should get class name correctly', () => {
            const layoutAttr = new LayoutStyleAttribute({id: '5', name: 'LayoutStyleAttribute', defaultValue: 'xLeftTop'});
            const className = layoutAttr.getClassName({
                direction: 'x',
                verticalAlign: 'center',
                horizontalAlign: 'end'
            });
            expect(className).to.equal('flex flex-row items-center justify-end');
        });
    });

});