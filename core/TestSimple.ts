import { canvas } from "./Canvas.js"
import { gdm } from "./GameDataManager.js";
// import { GameData } from "./Script/GameData/GameData.js"
// import { TestScript } from "./Script/Test.js"

function _test_canvas() {
	canvas.AddInlineText(`<b>Text 111</b>`).style.setProperty("--font-color", "#ff0000");
	canvas.AddLineBreak();
	canvas.AddInlineText(`<i>Text 222</i>`);
	canvas.AddInlineText("Text 333Text444");
	canvas.AddBlockText(`[sadgioio;fhioweafhoweaf]`);
	canvas.MakeButton(
		canvas.AddInlineText("Button"),
		()=>{
			console.log("Clicked.");
			canvas.UnregisterAll();

			canvas.AddBackgroundClick(() => {
				console.log("Background left clicked.");
				canvas.UnregisterAll();
			})
		}
	);
	canvas.AddInlineText("Text 555");

	canvas.AddLineBreak();
	canvas.MakeGrowable(canvas.MakeButton(canvas.AddInlineText("Button1")));
	canvas.MakeGrowable(canvas.MakeButton(canvas.AddInlineText("Button2")));
	canvas.MakeGrowable(canvas.MakeButton(canvas.AddInlineText("Button3")));
	canvas.AddLineBreak();

	canvas.AddInlineMeter(3, 0, 10);
}

/*
function _test_gamedata() {
	let data: GameData = new GameData();
	let dataStr = gdm.SerializeGameData(data);
	console.log(dataStr);
	let dataStrObj = gdm.DeserializeGameData(dataStr);
	console.log(dataStrObj);
	let dataStrObjStr = gdm.SerializeGameData(dataStrObj);
	console.log(dataStrObjStr);
}

function _test_script() {
	sm.Push(TestScript());
	sm.Continue();
}
*/

export function TestSimple() {
	//_test_canvas();
	//_test_gamedata();
	//_test_script();
}