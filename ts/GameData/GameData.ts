
// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.

import { Chara } from "./Chara";

//	
export class GameData {
	day: number = 0;
	her = new Chara();
}

export let gd = new GameData();