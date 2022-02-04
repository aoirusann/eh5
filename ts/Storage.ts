import { GameData } from "./GameData/GameData.js";
import { gdm } from "./GameDataManager.js";

export function Save(name: string, data: GameData) {
	localStorage.setItem(name, gdm.SerializeGameData(data));
}
export function Load(name: string): GameData {
	let data = localStorage.getItem(name);
	return gdm.DeserializeGameData(data);
}