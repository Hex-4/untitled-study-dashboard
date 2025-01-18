export const Workspace = $state({
    widgets: [],
    draggables: [],
    editMode: false,
    settingsOpen: false,
    settingsOwnerId: null,
    settings: [],
});

export class Widget {
    name = "";
    id = "";
    constructor(name: string) {
        this.name = name;
        this.id = this.name + "-" + Workspace.widgets.length;
    }
}

class Setting {
    value = null;
    name = "";
    description = "";
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class NumericalSetting extends Setting {
    value: number = null;
    constructor(name: string, description: string, defaultValue: number) {
        super(name, description);
        this.value = defaultValue;
    }
}

export class BooleanSetting extends Setting {
    value: boolean = null;
    constructor(name: string, description: string, defaultValue: boolean) {
        super(name, description);
        this.value = defaultValue;
    }
}
