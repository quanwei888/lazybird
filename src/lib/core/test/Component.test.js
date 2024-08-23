import {expect} from 'chai';
import {Node, NodeTypeManager, NodeType, NodeManager} from '../Node/index.js';
import {AttributeManager, Attribute} from '../Attribute/index.js';
import sinon from 'sinon';

describe('Component', () => {
    before(() => {
        // 清空 NodeTypeManager 中的 nodeTypes
        NodeTypeManager.nodeTypes.clear();
        // 使用 sinon.stub 替换 AttributeManager.getAttribute 方法
        sinon.stub(AttributeManager, 'getAttribute').callsFake(id => ({
            id,
            defaultValue: `default_${id}`,
            isValid: value => true
        }));
    });
    beforeEach(() => {
        // 每个测试用例前清空 NodeTypeManager 中的 nodeTypes
        NodeTypeManager.nodeTypes.clear();
    });

    after(() => {
        // 恢复 sinon 替换的方法
        sinon.restore();
    });

    it('should create a node with default values', () => {
        // 创建一个新的 NodeType
        const nodeType = new NodeType(1, 'TestNodeType', ['attr1', 'attr2']);
        NodeTypeManager.addNodeType(nodeType);
        // 创建一个节点
        const node = nodeType.createNode();

        // 验证节点的默认属性值
        expect(node.attributes['attr1']).to.equal('default_attr1');
        expect(node.attributes['attr2']).to.equal('default_attr2');
    });

    it('should create and modify a ComponentNodeType', () => {
        // 定义一个 ComponentNodeType
        const componentNodeType = new NodeType(2, 'ComponentNodeType', ['attr1', 'attr2']);
        NodeTypeManager.addNodeType(componentNodeType);

        // 创建一个 ComponentNodeType 的节点
        const mainNode = componentNodeType.createNode(); // 主节点
        const node = componentNodeType.createNode();

        // 修改主节点的属性
        mainNode.setAttribute('attr1', 'new_value1');

        // 验证属性是否被修改
        expect(mainNode.getAttribute('attr1')).to.equal('new_value1');
        expect(node.getAttribute('attr1')).to.equal('default_attr1');

        // 设置默认值为主节点的属性
        componentNodeType.setDefaultValues({...mainNode.attributes});
        expect(node.getAttribute('attr1')).to.equal('default_attr1');

        // 更新所有节点
        componentNodeType.updateAllNodes();
        expect(node.getAttribute('attr1')).to.equal('new_value1');

        // 创建一个新的节点并验证其属性
        const newNode = componentNodeType.createNode();
        expect(newNode.getAttribute('attr1')).to.equal('new_value1');
    });

    it('测试属性是 Object 的情况', () => {
        // 定义一个 ComponentNodeType
        const componentNodeType = new NodeType(2, 'ComponentNodeType', ['attr1', 'attr2']);
        NodeTypeManager.addNodeType(componentNodeType);

        // 创建 ComponentNodeType 的节点
        const mainNode = componentNodeType.createNode(); // 主节点
        const node = componentNodeType.createNode();
        const node1 = componentNodeType.createNode();
        node1.setAttribute('attr1', 'new_value1');

        // 修改主节点的属性
        mainNode.setAttribute('attr1', {a: 1, b: 2});
        // 设置默认值为主节点的属性
        componentNodeType.setDefaultValues({...mainNode.attributes});
        expect(node.getAttribute('attr1')).to.equal('default_attr1');

        // 更新所有节点
        componentNodeType.updateAllNodes();
        expect(node.getAttribute('attr1')).to.deep.equal({a: 1, b: 2});
        expect(node1.getAttribute('attr1')).to.equal('new_value1');
    });

    it('主节点增加子节点', () => {
        // 定义一个 ComponentNodeType
        const componentNodeType = new NodeType(2, '组件节点', ['attr1', 'attr2']);
        NodeTypeManager.addNodeType(componentNodeType);

        const childNodeType = new NodeType(3, '子节点', ['attr1']);
        NodeTypeManager.addNodeType(childNodeType);

        // 创建 ComponentNodeType 的节点
        const mainNode = componentNodeType.createNode(); // 主节点
        const node = componentNodeType.createNode();
        const childNode = childNodeType.createNode();

        // 修改主节点的属性
        NodeManager.insertNode(childNode.id, mainNode.id);
        // 设置默认值为主节点的属性
        componentNodeType.setDefaultChildren(mainNode.children);
        componentNodeType.updateAllNodes();
        expect(node.children.length).to.deep.equal(mainNode.children.length);
    });
});