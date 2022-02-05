import { gd } from "../GameData/GameData.js";
import { TimeUtility } from "../DataStructure/TimeUtility.js"
import { CharaState, 清醒程度 } from "../GameData/CharaState.js";
import { LBV_GetThreshold } from "../DataStructure/LevelBoundedVariable.js";

class Helper {
	public IsSleeping() {
		return gd.her.wakeness.value < LBV_GetThreshold(gd.her.wakeness, 清醒程度.模糊)
	}
}

export let hp = new Helper();
