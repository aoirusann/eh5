import { sm } from "./ScriptManager.js"
import { TestSimple } from "./TestSimple.js"
import { GameData } from "./GameData.js"
import { PlacePanel } from "./Scripts/PlacePanel.js"

window.onload = () => {
	sm.gd = new GameData();
	sm.Push(PlacePanel());
	sm.Continue();
}