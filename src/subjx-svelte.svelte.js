import subjx from "subjx";
import "subjx/dist/style/subjx.css";

export function drag(node) {
    const xElem = subjx(node);
    const xDraggable = xElem.drag({
        scalable: true,
        proportions: true,
    });

    return {
        destroy() {
            xDraggable.disable();
        },
    };
}
