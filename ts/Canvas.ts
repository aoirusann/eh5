class Canvas {
	bodyDOM: HTMLElement | null = null;
	canvasDOM: HTMLElement | null = null;
	unregisterCallbacks: (()=>void)[] = [];

	constructor() {
		this.bodyDOM = document.body;
		this.canvasDOM = document.getElementById("canvas");
	}

	// Text
	public AddInlineText(text: string): HTMLElement {
		let dom = document.createElement("scan");
		dom.innerHTML = text;
		dom.classList.add("inline");
		dom.classList.add("text");
		this.canvasDOM.appendChild(dom);
		return dom;
	}
	public AddBlockText(text: string): HTMLElement {
		let dom = document.createElement("div");
		dom.innerHTML = text;
		dom.classList.add("block");
		dom.classList.add("text");
		this.canvasDOM.appendChild(dom);
		return dom;
	}
	public AddMeter(value: number, min: number, max: number, isInline: boolean=true): HTMLElement {
		let dom = document.createElement("meter");
		dom.setAttribute("value", value.toString());
		dom.setAttribute("min", min.toString());
		dom.setAttribute("max", max.toString());
		dom.classList.add(isInline ? "inline" : "block");
		dom.classList.add("meter");
		this.canvasDOM.appendChild(dom);
		return dom;
	}

	// Paragraph Control
	public AddLineBreak(): HTMLElement {
		let dom = document.createElement("div");
		dom.classList.add("block");
		this.canvasDOM.appendChild(dom);
		return dom;
	}

	// Interact
	public AddInlineButton(text: string, onleftclick: ()=>void = null, onrightclick: ()=>void = null): HTMLElement {
		let dom = document.createElement("scan");
		dom.innerHTML = text;
		dom.classList.add("inline");
		dom.classList.add("button");
		dom.onclick = (ev: MouseEvent) => {
			if(ev.button == 0 && onleftclick) {
				onleftclick();
				ev.stopPropagation();
			}
			else if(ev.button == 2 && onrightclick) {
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
	public AddBackgroundClick(onleftclick: ()=>void = null, onrightclick: ()=>void = null) {
		var callback = (ev: MouseEvent) => {
			if(ev.button == 0 && onleftclick) {
				onleftclick();
				ev.stopPropagation();
			}
			else if(ev.button == 2 && onrightclick) {
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
	public UnregisterAll() {
		while(this.unregisterCallbacks.length > 0) {
			let callback = this.unregisterCallbacks.pop();
			callback();
		}
	}
}

let canvas = new Canvas();
export {canvas};