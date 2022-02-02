class Canvas {
    constructor() {
        this.bodyDOM = null;
        this.canvasDOM = null;
        this.unregisterCallbacks = [];
        this.bodyDOM = document.body;
        this.canvasDOM = document.getElementById("canvas");
    }
    // Text
    AddInlineText(text) {
        let dom = document.createElement("scan");
        dom.innerHTML = text;
        dom.classList.add("inline");
        dom.classList.add("text");
        this.canvasDOM.appendChild(dom);
        return dom;
    }
    AddBlockText(text) {
        let dom = document.createElement("div");
        dom.innerHTML = text;
        dom.classList.add("block");
        dom.classList.add("text");
        this.canvasDOM.appendChild(dom);
        return dom;
    }
    // Control
    AddLineBreak() {
        let dom = document.createElement("div");
        dom.classList.add("block");
        this.canvasDOM.appendChild(dom);
        return dom;
    }
    // Interact
    AddInlineButton(text, onleftclick = null, onrightclick = null) {
        let dom = document.createElement("scan");
        dom.innerHTML = text;
        dom.classList.add("inline");
        dom.classList.add("button");
        dom.onclick = (ev) => {
            if (ev.button == 0 && onleftclick) {
                onleftclick();
                ev.stopPropagation();
            }
            else if (ev.button == 2 && onrightclick) {
                onrightclick();
                ev.stopPropagation();
            }
        };
        this.unregisterCallbacks.push(() => {
            dom.onclick = null;
        });
        this.canvasDOM.appendChild(dom);
        return dom;
    }
    AddBackgroundClick(onleftclick = null, onrightclick = null) {
        var callback = (ev) => {
            if (ev.button == 0 && onleftclick) {
                onleftclick();
                ev.stopPropagation();
            }
            else if (ev.button == 2 && onrightclick) {
                onrightclick();
                ev.stopPropagation();
            }
        };
        this.bodyDOM.addEventListener("click", callback);
        this.unregisterCallbacks.push(() => {
            this.bodyDOM.removeEventListener("click", callback);
        });
    }
    // Listener Management
    UnregisterAll() {
        while (this.unregisterCallbacks.length > 0) {
            let callback = this.unregisterCallbacks.pop();
            callback();
        }
    }
}
let canvas = new Canvas();
export { canvas };
//# sourceMappingURL=Canvas.js.map