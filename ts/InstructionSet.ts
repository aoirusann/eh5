import { canvas } from "./Canvas.js";
import { sm } from "./ScriptManager.js";

class InstructionSet {
	public textStyle: string = "";
	public buttonStyle: string = "";

	public ltxt(value: string) {
		canvas.AddInlineText(value, this.textStyle);
	}
	public btxt(value: string) {
		canvas.AddBlockText(value, this.textStyle);
	}

	public linebreak() {
		canvas.AddLineBreak();
	}

	public lbtn(text: string, onleftclick: ()=>void = null, onrightclick: ()=>void = null) {
		let left = onleftclick ? () => {
			canvas.UnregisterAll();
			onleftclick();
			sm.Continue();
		} : null;
		let right = onrightclick ? () => {
			canvas.UnregisterAll();
			onrightclick();
			sm.Continue();
		} : null;

		canvas.AddInlineButton(
			text, left, right, this.buttonStyle
		);
	}

	public waitclick() {
		canvas.AddBackgroundClick(
			() => {
				canvas.UnregisterAll();
				sm.Continue();
			}
		)
	}
}

export let ins = new InstructionSet;