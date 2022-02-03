import { canvas } from "./Canvas.js";
import { sm } from "./ScriptManager.js";

class InstructionSet {
	public ltxt(value: string) {
		canvas.AddInlineText(value);
	}
	public btxt(value: string) {
		canvas.AddBlockText(value);
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
			text, left, right
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

export let is = new InstructionSet;