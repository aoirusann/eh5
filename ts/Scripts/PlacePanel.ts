import { ins } from "../InstructionSet.js"
import { sm } from "../ScriptManager.js"
import { TimeUtility } from "../TimeUtility.js";
import { Action } from "./Action.js"
import * as 家 from "./家.js";
import * as 学校 from "./学校.js";

export function* PlacePanel() {
	while(true) {
		ins.clrbtn();
		ins.linebreak();
		ins.btxt("<b>======================</b>");

		let actions: Action[];

		// Collect actions concerned with place
		if(sm.gd.place[0] == "家") {
			actions = 家.actions;
		}
		else if(sm.gd.place[0] == "学校") {
			actions = 学校.actions;
		}

		// Build action buttons
		for (const action of actions) {
			if(action.canDo())
				action.BuildButton();
		}

		yield;
	}
}