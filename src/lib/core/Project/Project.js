export class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.pages = [];
        this.components = [];
        this.currentPage = null;
        this.currentComponent = null;
        this.selectedId = null;
        this.currentDrop = null;//{ id: null, index: null}
        this.currentDrag = null;//{ id: null, width: null,height:null}
    }
}
