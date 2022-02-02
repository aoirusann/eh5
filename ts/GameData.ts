// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.
//	
export class GameData {
	time: number = new Date(0).getTime();
}







export function SerializeGameData(obj: GameData):string {
	return JSON.stringify(obj);
}
export function DeserializeGameData(str: string):GameData {
	return <GameData>JSON.parse(str);
}