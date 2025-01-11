export const Workspace = $state({
    widgets: [],
    draggables: [],
    editMode: false,
});

export class Widget {
    name = "";
    id = "";
    constructor(name, component) {
        this.name = name;
        this.id = this.name + "-" + Workspace.widgets.length;
    }
}
