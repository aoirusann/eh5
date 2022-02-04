import { ins } from "../InstructionSet.js";
import { gd } from "../GameData/GameData.js";
import { TimeUtility } from "../DataStructure/TimeUtility.js";
import { Action } from "./Action.js";
import { hp } from "./Helper.js"

export let actions: Action[] = [
new Action(
	"洗漱",
	():void => {
		ins.timeElapse(TimeUtility.minute(10));
		ins.bv(gd.清洁度, 30);
		ins.waitclick();
	},
	():boolean => {
		return true;
	},
),
new Action(
	"上学",
	():void => {
		ins.timeElapse(TimeUtility.minute(30));
		ins.bv(gd.体力, -5);
		ins.bv(gd.清洁度, -5);
		ins.gotoPlace(["学校", "教室"]);
		ins.waitclick();
	},
	():boolean => {
		return hp.isCurrentInInterval(
			5, 0,
			9, 0
		);
	}
),
new Action(
	"睡觉",
	():void => {
		ins.clockUntil(7, 0);
		ins.bv(gd.体力, 100);
		ins.waitclick();
	}
)
];
