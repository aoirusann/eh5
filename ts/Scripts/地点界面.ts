import { ins } from "../InstructionSet.js"
import { sm } from "../ScriptManager.js"
import { 移动界面 } from "./移动界面.js";

export function* 地点界面() {
	ins.textStyle = "";
	ins.btxt(`Reached ${sm.gd.place}.`);
	yield ins.waitclick();
	yield 移动界面();
}