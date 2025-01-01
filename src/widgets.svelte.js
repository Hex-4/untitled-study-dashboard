export const Workspace = $state({
    widgets: [],
});

export class Widget {
    name = "";
    id = "";
    constructor(name, component) {
        this.name = name;
        this.id = this.name + "-" + Workspace.widgets.length;
    }
}
