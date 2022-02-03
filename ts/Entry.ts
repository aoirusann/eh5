import { sm } from "./ScriptManager.js"
import { TestSimple } from "./TestSimple.js"
import { 移动界面 } from "./Scripts/移动界面.js"
import { GameData } from "./GameData.js"

window.onload = () => {
	sm.gd = new GameData();
	sm.Push(移动界面());
	sm.Continue();
}