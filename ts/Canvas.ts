class Canvas {
	bodyDOM: HTMLElement | null = null;
	canvasDOM: HTMLElement | null = null;
	unregisterCallbacks: (()=>void)[] = [];

	constructor() {
		this.bodyDOM = document.body;
		this.canvasDOM = document.getElementById("canvas");
	}

	private AddDOM(tagName: string, classList: string[]): HTMLElement {
		let dom = document.createElement(tagName);
		for (const className of classList) {
			if(className.length > 0)
				dom.classList.add(className);
		}
		this.canvasDOM.appendChild(dom);
		return dom;
	}

	// DOM Decorator
	public MakeGrowable(dom: HTMLElement, factor: number = 1): HTMLElement {
		dom.classList.add("growable");
		dom.style.setProperty("--grow-factor", factor.toString());
		return dom
	}

	// Text
	public AddInlineText(text: string, cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"scan",
			[
				"inline",
				"text",
				cssClass
			]
		);
		dom.innerHTML = text;
		return dom;
	}
	public AddBlockText(text: string, cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"scan",
			[
				"block",
				"text",
				cssClass
			]
		);
		text = text.replace(/\r\n/g, "<br/>");
		text = text.replace(/\n/g, "<br/>");
		dom.innerHTML = text;
		return dom;
	}
	public AddInlineMeter(value: number, min: number, max: number, cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"meter",
			[
				"inline",
				"meter",
				cssClass
			]
		);
		dom.setAttribute("value", value.toString());
		dom.setAttribute("min", min.toString());
		dom.setAttribute("max", max.toString());
		return dom;
	}

	// Paragraph Control
	public AddLineBreak(cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"div",
			[
				"block",
				cssClass
			]
		);
		return dom;
	}

	// Interact
	public AddInlineButton(text: string, onleftclick: ()=>void = null, onrightclick: ()=>void = null, cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"scan",
			[
				"inline",
				"button",
				"text",
				cssClass
			]
		);
		dom.innerHTML = text;
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
		return dom;
	}

	// Body
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