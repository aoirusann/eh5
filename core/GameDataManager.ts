class GameDataManager {
	/**
	 * Shallow Copy. Use `src` to update `dst`.
	 */
	public UpdateFrom(dst, src) {
		Object.assign(dst, src);
	}
	/**
	 * Serialize to json. Note methods will not be serialized.
	 */
	public SerializeGameData(obj):string {
		return JSON.stringify(obj);
	}
	public DeserializeGameData(str: string) {
		return JSON.parse(str);
	}
}

export let gdm = new GameDataManager();