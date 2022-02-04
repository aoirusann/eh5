import { canvas } from "./Canvas.js";
import { BoundedVariable, BV_Add } from "./DataStructure/BoundedVariable.js";
import { sm } from "./ScriptManager.js";
import { gd } from "./GameData/GameData.js"
import { TimeUtility } from "./DataStructure/TimeUtility.js";

class InstructionSet {
	// ==== style control ====
	public textStyle: string = "";
	public buttonStyle: string = "";
	public varChangeStyle: string = "";

	// ===== text =====
	// normal text
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

	// ==== variable helpers ====
	// var
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