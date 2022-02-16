class Canvas {
	bodyDOM: HTMLElement | null = null;
	canvasDOM: HTMLElement | null = null;
	unregisterCallbacks: (()=>void)[] = [];

	DOMStack: HTMLElement[] = [];
	DOMStackMaxSize: number = 99999;

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
		
		this.DOMStack.push(dom);
		while(this.DOMStackMaxSize < this.DOMStack.length) {
			let popedDOM = this.DOMStack[0];
			this.DOMStack.shift();
			this.canvasDOM.removeChild(popedDOM);
		}

		return dom;
	}

	// DOM Decorator
	public MakeGrowable(dom: HTMLElement, factor: number = 1): HTMLElement {
		dom.classList.add("growable");
		dom.style.setProperty("--grow-factor", factor.toString());
		return dom
	}
	public MakeButton(dom: HTMLElement, onleftclick: ()=>void = null, onrightclick: ()=>void = null): HTMLElement {
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
		return dom;
	}
	public MakeAltHint(dom: HTMLElement, hint: string): HTMLElement {
		dom.classList.add("althint");
		dom.setAttribute("alt", hint);
		return dom;
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

	// Image
	public AddInlineImage(imgPath: string = "", cssClass: string = ""): HTMLElement {
		let dom = this.AddDOM(
			"img",
			[
				"inline",
				"image",
				cssClass
			]
		);
		dom.setAttribute("src", imgPath);
		dom.setAttribute("alt", imgPath);
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

	// Scroll Management
	public ScrollToBottom() {
		window.scrollTo(0, this.bodyDOM.scrollHeight);
	}
}

let canvas = new Canvas();
export {canvas};