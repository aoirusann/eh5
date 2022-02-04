import { ins } from "../InstructionSet.js"
import { sm } from "../ScriptManager.js"
import { gd } from "../GameData/GameData.js";
import { TimeUtility } from "../DataStructure/TimeUtility.js";
import { Action } from "./Action.js"
import { Load, Save } from "../Storage.js";
import { gdm } from "../GameDataManager.js";

export function* Panel() {
	while(true) {
		let actions: Action[];

		ins.linebreak();
		new Action(
			"存档",
			() => {
				Save("SaveData0", gd);
				ins.btxt("存档成功。");
			}
		).BuildButton();
		new Action(
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
		).BuildButton();
		ins.linebreak();

		ins.btxt("<b>======================</b>");
		yield;
	}
}