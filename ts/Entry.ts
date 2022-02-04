import { sm } from "./ScriptManager.js"
import { TestSimple } from "./TestSimple.js"
import { GameData } from "./GameData/GameData.js"
import { Panel } from "./Script/Panel.js"

window.onload = () => {
	sm.Push(Panel());
	sm.Continue();
	// TestSimple();
}