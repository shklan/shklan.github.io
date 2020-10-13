`use strict`;

window.onload = init;
function init() {
    const glcnv = document.createElement("canvas");
    glcnv.height = 740;
    glcnv.width = 1200;
    document.getElementsByClassName("Canvas")[0].appendChild(glcnv);

    const glctx = glcnv.getContext("webgl");
    if(glctx == null) {
        console.log("cannot initialize webGL");
        return;
    }

    glctx.clearColor(0.0, 0.0, 0.0, 1.0);
    glctx.clear(glctx.COLOR_BUFFER_BIT);

    const title = new TitleScene(glctx);
    title.renderScene();

};

class KeydownListener extends EventTarget {
    constructor() {
        this.events = [];
    }

    addAction(key, action) {
        this.events.push({key: key, action: action});
    }

    listen() {
        this.addEventListener("keydown", this.handle.bind(this));
    }

    close() {
        this.removeEventListener("keydown", this.handle.bind(this));
    }

    handle(event) {
        const code = event.key;
        this.events.forEach(e => {
            if (e["key"] == code) {
                e["action"]();
            }            
        });
    }
}
