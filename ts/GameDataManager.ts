import { GameData, gd } from "./GameData/GameData.js";


class GameDataManager {
	/**
	 * Shallow Copy. Use `src` to update current gamedata.
	 */
	public UpdateCurrentFrom(src: GameData) {
		Object.assign(gd, src);
	}
	public SerializeGameData(obj: GameData):string {
		return JSON.stringify(obj);
	}
	public DeserializeGameData(str: string):GameData {
		return <GameData>JSON.parse(str);
	}
}

export let gdm = new GameDataManager();