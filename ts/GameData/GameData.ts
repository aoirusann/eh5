
// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.

import { LevelBoundedVariable } from "../DataStructure/LevelBoundedVariable.js";
import { CharaState } from "./CharaState.js";

export enum Time {
	Invalid = 0,
	早上,
	上午,
	中午,
	下午,
	黄昏,
	夜晚,
	深夜,
	凌晨,
}

export enum Power {
	没有性别的虫子,
	具有繁殖能力的雄虫,
	能吸引雌虫的雄虫,
	能播种其他种雌虫的雄虫,
	虫族之父,
	能让人类雌性怀孕的雄性,
	能吸引人类雌性的雄性,
	国民老公,
}

export class GameData {
	day: number = 0;
	time: Time = Time.黄昏;
	pos: string = "";

	her = new CharaState();

	power = new LevelBoundedVariable(
		"雄性力量", 0, 1000,
		{
			  0: Power.没有性别的虫子,
			 10: Power.具有繁殖能力的雄虫,
			100: Power.能吸引雌虫的雄虫,
			200: Power.能播种其他种雌虫的雄虫,
			300: Power.虫族之父,
			600: Power.能让人类雌性怀孕的雄性,
			700: Power.能吸引人类雌性的雄性,
			900: Power.国民老公,
		},
		0
	)
}

export let gd = new GameData();