import {
    createAttribute,
} from './api.ts';
import {
    AttributeCreate,
} from './models';

const attributeData: AttributeCreate = {
    uuid: 'test-uuid',
    name: 'Test Attribute',
    value: {},
    node_type_id: 1
};


const response = await createAttribute(attributeData);
console.log(response);