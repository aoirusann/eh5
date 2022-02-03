import { BV_Add } from "../DataStructures/BoundedVariable.js";
import { ins } from "../InstructionSet.js"
import { sm } from "../ScriptManager.js"
import { TimeUtil } from "../TimeUtil.js";
import { 移动界面 } from "./移动界面.js";

class Action {
	constructor(
		public name: string,
		public ondo: ()=>void,
		public nextWindow: IterableIterator<any>
	) {}

	public BuildButton() {
		ins.lbtn(this.name, () => {
			this.ondo();
			sm.Push(this.nextWindow);
			ins.waitclick();
		});
	}
}

function 家() {
	new Action(
		"洗漱",
		() => {
			ins.time(TimeUtil.minute(10));
			ins.bv(sm.gd.清洁度, 60);
		},
		地点界面()
	).BuildButton();
	new Action(
		"睡觉",
		() => {
			ins.time(TimeUtil.hour(9));
			ins.bv(sm.gd.体力, 100);
		},
		地点界面()
	).BuildButton();
}

function 学校() {
	new Action(
		"学习",
		() => {
			ins.time(TimeUtil.hour(9));
			ins.bv(sm.gd.体力, -60);
			ins.bv(sm.gd.清洁度, -50);
		},
		地点界面()
	).BuildButton();
}

export function* 地点界面() {
	if(sm.gd.place[0] == "家") {
		家();
	}
	else if(sm.gd.place[0] == "学校") {
		学校();
	}
	ins.linebreak();

	ins.lbtn("移动", () => {
		sm.gd.place.pop();
		sm.Push(移动界面());
	});
	ins.linebreak();
}