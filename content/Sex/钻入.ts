import { 清醒程度 } from "../GameData/CharaState.js";
import { gd } from "../GameData/GameData.js";
import { ins } from "../InstructionSet.js";
import { Action } from "../Action.js";
import { hp } from "../Helper.js";

export let actions = [
	new Action(
		"钻出",
		() => {
			ins.btxt("你钻了出来");
			gd.pos = "";
		},
		() => gd.pos.length > 0
	),
	new Action(
		"钻入小穴",
		() => {
			ins.btxt(`你钻进了${gd.her.name}的小穴里`);
			gd["pos"] = "小穴";
			ins.bvdelta(gd.her.wakeness, 5);
			ins.bvdelta(gd.her.V, 1);
			ins.bvdelta(gd.power, 5);
		},
		() => 
			hp.IsSleeping() &&
			gd["pos"] != "小穴"
	)
]