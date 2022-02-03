import { canvas } from "./Canvas";

class ScriptManager {
	scriptStack: IterableIterator<any>[] = [];

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
		// and iterate this funciton to backtrace upward.
		if(res.done) {
			this.scriptStack.pop();
			this.Continue();
		}
		
		// The script is trying to enter a sub script
		// We push the sub script into our script stack,
		// and iterate this function to enter it.
		var sub = <IterableIterator<any>>res.value;
		if(sub) {
			this.Push(res.value);
			this.Continue();
		}
	}

	public Push(script: IterableIterator<any>) {
		this.scriptStack.push(script);
	}
}

export let sm = new ScriptManager();