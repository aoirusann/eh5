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
	// time
	public timeElapse(duration: number) {
		let oldTime = gd.time;
		gd.time += duration;
		let newTime = gd.time;

		canvas.AddBlockText(
			`${TimeUtility.getClockString(oldTime)} => ${TimeUtility.getClockString(newTime)}`,
			this.varChangeStyle
		);
	}
	/**
	 * 向前推进时间，直到hour, minute指定的时刻。
	 * 例如hour==13, minute==32，那么时间就会经过到13:32.
	 * 若当前时刻大于指定时刻，则会导致日期向前推进一天。
	 * @param targetHour 0~23
	 * @param targetMinute 0~59
	 */
	public clockUntil(targetHour: number, targetMinute: number) {
		let curHour = TimeUtility.getHour(gd.time);
		let curMinute = TimeUtility.getMinute(gd.time);

		let duration = TimeUtility.calClockDiff(
			curHour, curMinute,
			targetHour, targetMinute,
		);
		this.timeElapse(duration);
	}
	// place
	public gotoPlace(targetPlace: string[]) {
		let oldPlace = gd.place;
		gd.place = targetPlace;

		canvas.AddBlockText(
			`${oldPlace} => ${targetPlace}`,
			this.varChangeStyle
		);
	}
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