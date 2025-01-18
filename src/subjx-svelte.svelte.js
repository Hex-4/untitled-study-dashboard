import subjx from "subjx";
import "./subjx.css";
import { Workspace } from "./widgets.svelte";

export function drag(node) {
    const xElem = subjx(node);
    const xDraggable = xElem.drag({
        scalable: true,
        proportions: true,
    });
    if (Workspace.editMode == false) {
        xDraggable.disable();
    }
    Workspace.draggables.push(xDraggable);

    return {
        destroy() {
            xDraggable.disable();
            const index = Workspace.draggables.indexOf(xDraggable);
            if (index > -1) {
                // only splice array when item is found
                Workspace.draggables.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
    };
}
