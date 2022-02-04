import { ins } from "../InstructionSet.js";
import { sm } from "../ScriptManager.js";

export class Action {
	constructor(
		public name: string,
		public onDo: ()=>void = ()=>{},
		public canDo: ()=>boolean = ()=>true,
		public buttonStyle: string = "action_button"
	) {}

	public BuildButton() {
		ins.buttonStyle = this.buttonStyle;
		ins.lbtn(this.name, () => {
			this.onDo();
		});
	}
}

export class ActionUtil {
	public static CheckPlace(places: string[]) {
		// TODO
	}
}
