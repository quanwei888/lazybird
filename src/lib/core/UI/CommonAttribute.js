import {Attribute} from "../Attribute/index.js";


export const title = (value = "this is a title") => new Attribute({
    name: "title",
    value: value,
    option: {editMode: "text", type: "props"}
});

export const text = (value = "Hello World") => new Attribute({
    name: "text",
    value: value,
    option: {editMode: "text", type: "props"}
});