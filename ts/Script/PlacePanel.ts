import { ins } from "../InstructionSet.js"
import { sm } from "../ScriptManager.js"
import { gd } from "../GameData/GameData.js";
import { TimeUtility } from "../DataStructure/TimeUtility.js";
import { Action } from "./Action.js"
import * as 家 from "./家.js";
import * as 学校 from "./学校.js";
import { Load, Save } from "../Storage.js";
import { gdm } from "../GameDataManager.js";

export function* PlacePanel() {
	while(true) {
		ins.clrbtn();
		ins.linebreak();
		ins.btxt("<b>======================</b>");

		let actions: Action[];

		// Collect actions concerned with place
		if(gd.place[0] == "家") {
			actions = 家.actions;
		}
		else if(gd.place[0] == "学校") {
			actions = 学校.actions;
		}

		// Build action buttons
		for (const action of actions) {
			if(action.canDo())
				action.BuildButton();
		}

		ins.linebreak();
		ins.lbtn(
			"存档",
			() => {
				Save("SaveData0", gd);
				ins.btxt("存档成功。");
			}
		);
		ins.lbtn(
			"读档",
			() => {
				let data = Load("SaveData0");
				if(data) {
					gdm.UpdateCurrentFrom(data);
					ins.btxt("读档成功。");
				}
				else {
					ins.btxt("没有存档。");
				}
			}
		)

		yield;
	}
}