import { gd } from "../GameData/GameData.js";
import { TimeUtility } from "../DataStructure/TimeUtility.js"

class Helper {
	/**
	 * @returns true if cur < target
	 */
	public isCurrentEarlier(targetHour: number, targetMinute: number) {
		let curHour = TimeUtility.getHour(gd.time);
		let curMinute = TimeUtility.getMinute(gd.time);
		return TimeUtility.isClockEarlier(
			curHour, curMinute,
			targetHour, targetMinute,
		);
	}
	/**
	 * @returns true if cur >= target
	 */
	public isCurrentLater(targetHour: number, targetMinute: number) {
		let curHour = TimeUtility.getHour(gd.time);
		let curMinute = TimeUtility.getMinute(gd.time);
		return TimeUtility.isClockEarlier(
			targetHour, targetMinute,
			curHour, curMinute,
		);
	}
	/**
	 * @returns true if curTime in [startHour:startMinute, endHour:endMinute).
	 */
	public isCurrentInInterval(startHour: number, startMinute: number, endHour: number, endMinute: number) {
		let curHour = TimeUtility.getHour(gd.time);
		let curMinute = TimeUtility.getMinute(gd.time);
		return TimeUtility.isClockInInterval(
			startHour, startMinute,
			curHour, curMinute,
			endHour, endMinute,
		);
	}
}

export let hp = new Helper();