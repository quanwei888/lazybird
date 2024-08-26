export class AttributeManager {
    static attributes = new Map();

    static addAttribute(attribute) {
        if (!this.attributes.has(attribute.id)) {
            this.attributes.set(attribute.id, attribute);
        } else {
            console.log(`Attribute with id ${attribute.id} already exists.`);
        }
    }

    static getAttribute(id) {
        return this.attributes.get(id);
    }

    static removeAttribute(id) {
        return this.attributes.delete(id);
    }

}