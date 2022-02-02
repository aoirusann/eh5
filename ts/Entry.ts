import { canvas } from "./Canvas.js"
import { DeserializeGameData, GameData, SerializeGameData } from "./GameData.js"

window.onload = () => {
	canvas.AddInlineText(`<b>Text 111</b>`).style.setProperty("--font-color", "#ff0000");
	canvas.AddLineBreak();
	canvas.AddInlineText(`<i>Text 222</i>`);
	canvas.AddInlineText("Text 333Text444");
	canvas.AddBlockText(`[sadgioio;fhioweafhoweaf]`);
	canvas.AddInlineButton("Button", ()=>{
		console.log("Clicked.");
		canvas.UnregisterAll();

		canvas.AddBackgroundClick(() => {
			console.log("Background left clicked.");
			canvas.UnregisterAll();
		})
	});
	canvas.AddInlineText("Text 555");

	canvas.AddLineBreak();
	canvas.MakeGrowable(canvas.AddInlineButton("Button1"));
	canvas.MakeGrowable(canvas.AddInlineButton("Button2"));
	canvas.MakeGrowable(canvas.AddInlineButton("Button3"));
	canvas.AddLineBreak();

	canvas.AddInlineMeter(3, 0, 10);

	let data: GameData = new GameData();
	data.hp = 3;
	data.obj.atk = 4;
	let dataStr = SerializeGameData(data);
	console.log(dataStr);
	let dataStrObj = DeserializeGameData(dataStr);
	console.log(dataStrObj);
	let dataStrObjStr = SerializeGameData(dataStrObj);
	console.log(dataStrObjStr);
}