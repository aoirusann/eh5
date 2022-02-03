import { ins } from "../InstructionSet.js";
import { sm } from "../ScriptManager.js";
import { TimeUtility } from "../TimeUtility.js";
import { Action } from "./Action.js";
import { hp } from "./Helper.js"

export let actions: Action[] = [
new Action(
	"等到上课",
	():void => {
		ins.clockUntil(9, 0);
		ins.waitclick();
	},
	() => {
		return hp.isCurrentInInterval(
			6, 0,
			9, 0
		);
	}
),
new Action(
	"上课",
	():void => {
		ins.clockUntil(16, 0);
		ins.bv(sm.gd.体力, -30);
		ins.bv(sm.gd.清洁度, -20);
		ins.waitclick();
	},
	():boolean => {
		return hp.isCurrentInInterval(
			9, 0,
			16, 0
		);
	},
),
new Action(
	"回家",
	():void => {
		ins.timeElapse(TimeUtility.minute(30));
		ins.bv(sm.gd.体力, -5);
		ins.bv(sm.gd.清洁度, -5);
		ins.gotoPlace(["家", "卧室"]);
		ins.waitclick();
	},
	() => {
		return hp.isCurrentInInterval(
			16, 0,
			9, 0
		);
	}
)
];

