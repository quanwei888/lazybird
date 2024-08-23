export class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.pages = [];
        this.components = [];
        this.currentPage = null;
        this.currentComponent = null;
        this.selectedId = null;
        this.overId = null;
        this.draggingId = null;
        this.nodes = null;
    }
}
