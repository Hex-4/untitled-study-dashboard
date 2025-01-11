export const Workspace = $state({
    widgets: [],
    draggables: [],
});

export class Widget {
    name = "";
    id = "";
    constructor(name, component) {
        this.name = name;
        this.id = this.name + "-" + Workspace.widgets.length;
    }
}
