import { canvas } from "./Canvas.js";
import { BoundedVariable, BV_Add } from "./DataStructures/BoundedVariable.js";
import { sm } from "./ScriptManager.js";
import { TimeUtility } from "./TimeUtility.js";

class InstructionSet {
	// style control
	public textStyle: string = "";
	public buttonStyle: string = "";
	public varChangeStyle: string = "";

	// variable helpers
	public timeElapse(duration: number) {
		let oldTime = sm.gd.time;
		sm.gd.time += duration;
		let newTime = sm.gd.time;

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
		let curHour = TimeUtility.getHour(sm.gd.time);
		let curMinute = TimeUtility.getMinute(sm.gd.time);

		let duration = TimeUtility.calClockDiff(
			curHour, curMinute,
			targetHour, targetMinute,
		);
		this.timeElapse(duration);
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
	public gotoPlace(targetPlace: string[]) {
		let oldPlace = sm.gd.place;
		sm.gd.place = targetPlace;

		canvas.AddBlockText(
			`${oldPlace} => ${targetPlace}`,
			this.varChangeStyle
		);
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
		let left = () => {
			canvas.UnregisterAll();
			onleftclick();
		};
		let right = () => {
			canvas.UnregisterAll();
			onrightclick();
		};

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

	// refresh
	public clrbtn() {
		canvas.UnregisterAll();
	}
}

export let ins = new InstructionSet;