import { BoundedVariable } from "./DataStructures/BoundedVariable.js"

// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.
//	
export const PLACES = [
	["家", 
		["卧室", "厕所", ]
	],
	["学校",
		["教室", "操场", ]
	],
];
export class GameData {
	time: number = new Date(0).getTime();
	place: string[] = ["家", "卧室"];

	体力 = new BoundedVariable(0, 100, 100);
}







export function SerializeGameData(obj: GameData):string {
	return JSON.stringify(obj);
}
export function DeserializeGameData(str: string):GameData {
	return <GameData>JSON.parse(str);
}