import { sm } from "./ScriptManager.js"
import { TestSimple } from "./TestSimple.js"
import { GameData } from "./GameData/GameData.js"
import { PlacePanel } from "./Scripts/PlacePanel.js"

window.onload = () => {
	sm.Push(PlacePanel());
	sm.Continue();
	// TestSimple();
}