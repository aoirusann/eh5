import { rmSync } from "fs";
import { GameData } from "./GameData";

class ScriptManager {
	private scriptStack: IterableIterator<any>[] = [];
	private currentGameData: GameData;

	public get gd() { return this.currentGameData; }
	public set gd(value: GameData) { this.currentGameData = value; }

	public Continue() {
		if(this.scriptStack.length == 0) {
			console.log("No script assigned.");
			return;
		}

		// Execute the current script
		var cur = this.scriptStack[this.scriptStack.length-1];
		var res = cur.next();

		// The current script is done, 
		// so we remove it 
		if(res.done)
			this.scriptStack.pop();
		
		// The script is trying to enter a sub script
		// We push the sub script into our script stack,
		// and iterate this function to enter it.
		var sub = <IterableIterator<any>>res.value;
		if(sub) {
			this.Push(res.value);
			this.Continue();
		}
		
		// If the current script is done & there is no script pushed,
		//   we iterate upward
		if(res.done && !sub) {
			if(this.scriptStack.length > 0)
				this.Continue();
		}
	}

	public Push(script: IterableIterator<any>) {
		this.scriptStack.push(script);
	}
}

export let sm = new ScriptManager();