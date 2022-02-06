import { gdm } from "./GameDataManager.js";

export function Save(name: string, data) {
	localStorage.setItem(name, gdm.SerializeGameData(data));
}
export function Load(name: string) {
	let data = localStorage.getItem(name);
	return gdm.DeserializeGameData(data);
}