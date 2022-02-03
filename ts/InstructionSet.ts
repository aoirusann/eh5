import { canvas } from "./Canvas.js";
import { BoundedVariable, BV_Add } from "./DataStructures/BoundedVariable.js";
import { sm } from "./ScriptManager.js";
import { TimeUtil } from "./TimeUtil.js";

class InstructionSet {
	// style control
	public textStyle: string = "";
	public buttonStyle: string = "";
	public varChangeStyle: string = "";

	// variable helpers
	public time(duration: number) {
		let oldTime = sm.gd.time;
		sm.gd.time += duration;
		let newTime = sm.gd.time;

		canvas.AddBlockText(
			`${TimeUtil.getClockString(oldTime)} => ${TimeUtil.getClockString(newTime)}`,
			this.varChangeStyle
		);
	}
	public bv(v: BoundedVariable, amount: number): number {
		let oldValue = v.value;
		let overflow = BV_Add(v, amount);
		let newValue = v.value;
		
		canvas.AddBlockText(
			`${v.name}: ${oldValue} => ${newValue} (${newValue-oldValue})`,
			this.varChangeStyle
		);
		return overflow;
	}

	// text
	public ltxt(value: string) {
		canvas.AddInlineText(value, this.textStyle);
	}
	public btxt(value: string) {
		canvas.AddBlockText(value, this.textStyle);
	}

	// paragraph control
	public linebreak() {
		canvas.AddLineBreak();
	}

	// button
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

	// flow control
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