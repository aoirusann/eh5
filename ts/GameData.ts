export class ComplexObject {
	atk: number = 0;
	def: number = 0;
	smi: number = 0;
}

// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.
//	
export class GameData {
	hp: number = 0;
	obj: ComplexObject = new ComplexObject();
}

export function SerializeGameData(obj: GameData):string {
	return JSON.stringify(obj);
}
export function DeserializeGameData(str: string):GameData {
	return <GameData>JSON.parse(str);
}