export class ComplexObject {
    constructor() {
        this.atk = 0;
        this.def = 0;
        this.smi = 0;
    }
}
// NOTE: NO METHODS, Only DATA.
//	Be careful, these serializable classes should not contain methods.
//	Because after deserializing, type info is lost.
//	
export class GameData {
    constructor() {
        this.hp = 0;
        this.obj = new ComplexObject();
    }
}
export function SerializeGameData(obj) {
    return JSON.stringify(obj);
}
export function DeserializeGameData(str) {
    return JSON.parse(str);
}
//# sourceMappingURL=GameData.js.map