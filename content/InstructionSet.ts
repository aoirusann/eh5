import { canvas } from "../core/Canvas.js";
import { BoundedVariable, BV_Add } from "./DataStructure/BoundedVariable.js";
import { sm } from "../core/ScriptManager.js";

class InstructionSet {
	// ==== style control ====
	public textStyle: string = "";
	public buttonStyle: string = "";
	public varChangeStyle: string = "";

	// ===== text =====
	// normal text
	public ltxt(value: string) {
		// deprecated
		canvas.AddInlineText(value, this.textStyle);
	}
	public btxt(value: string) {
		// deprecated
		canvas.AddBlockText(value, this.textStyle);
	}
	public set word(value: string) {
		canvas.AddInlineText(value, this.textStyle);
	}
	public set line(value: string) {
		canvas.AddBlockText(value, this.textStyle);
	}

	// paragraph control
	public linebreak() {
		canvas.AddLineBreak();
	}
	/**
	 * @param char default "-"
	 * @param repeatTimes default 10
	 */
	public separator(char = "-", repeatTimes = 20) {
		let s = "";
		for(let i=0; i<repeatTimes; i++)
			s += char;
		canvas.AddBlockText("<b>" + s + "</b>", "separator");
	}

	// ==== variable helpers ====
	// var
	public bvdelta(v: BoundedVariable, amount: number): number {
		let oldValue = v.value;
		let overflow = BV_Add(v, amount);
		let newValue = v.value;
		
		canvas.AddBlockText(
			`${v.name}: ${oldValue} => ${newValue} (${newValue-oldValue})`,
			this.varChangeStyle
		);
		return overflow;
	}
	public bvto(v: BoundedVariable, target: number) {
		let oldValue = v.value;
		v.value = target;
		let newValue = v.value;
		
		canvas.AddBlockText(
			`${v.name}: ${oldValue} => ${newValue} (${newValue-oldValue})`,
			this.varChangeStyle
		);
	}

	// ==== User Input ====
	/**
	 * Build the onUserInput callback to refresh the page & continue the script when the user inputs.
	 * @param ondo actual work
	 * @returns the onUserInput callback wrapping the actual work `ondo` with refreshing.
	 */
	private onUserInput(ondo: ()=>void = ()=>{}) {
		return () => {
			this.clrbtn();
			ondo();
			sm.Continue();
			this.scrolldown();
		}
	}

	// button
	public lbtn(text: string, onleftclick: ()=>void = null, onrightclick: ()=>void = null) {
		canvas.AddInlineButton(
			text, 
			this.onUserInput(onleftclick),
			this.onUserInput(onrightclick), 
			this.buttonStyle
		);
	}

	// flow control
	public waitclick() {
		canvas.AddBackgroundClick(this.onUserInput());
	}

	// ==== Refresh Conrtol ====
	public clrbtn() {
		canvas.UnregisterAll();
	}
	public scrolldown() {
		canvas.ScrollToBottom();
	}
}

export let ins = new InstructionSet;