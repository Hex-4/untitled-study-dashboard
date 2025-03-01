export const Workspace = $state({
    widgets: [],
    draggables: [],
    editMode: false,
    settingsOpen: false,
    globalSettingsOpen: false,
    settingsOwnerId: null,
    settings: [],
    globalSettings: [],
});

export class Widget {
    name = "";
    id = "";
    constructor(name: string) {
        this.name = name;
        this.id = this.name + "-" + uid();
    }
}

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, "0")
}

export class Setting {
    value = $state();
    name = "";
    description = "";
    constructor(name: string, description: string,) {
        this.name = name;
        this.description = description;
    }
}

export class NumericalSetting extends Setting {
    value: number = $state(null);
    constructor(name: string, description: string, defaultValue: number) {
        super(name, description);
        this.value = defaultValue;
    }
}

export class BooleanSetting extends Setting {
    value: boolean = $state(null);
    constructor(name: string, description: string, defaultValue: boolean) {
        super(name, description);
        this.value = defaultValue;
    }
}

export class GlobalSetting extends Setting {
    value = $state(null);
    constructor(name: string, description: string, defaultValue: boolean) {
        super(name, description);
        this.value = defaultValue;
    }
}
