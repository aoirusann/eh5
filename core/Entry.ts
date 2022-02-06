import { sm } from "./ScriptManager.js"
import { TestSimple } from "./TestSimple.js"
import { Main } from "../content/Main.js"

window.onload = () => {
	sm.Push(Main());
	sm.Continue();
	// TestSimple();
}