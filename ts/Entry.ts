import { canvas } from "./Canvas.js"
import { DeserializeGameData, GameData, SerializeGameData } from "./GameData.js"

window.onload = () => {
	canvas.AddInlineText(`<b>Text 111</b>`);
	canvas.AddLineBreak();
	canvas.AddInlineText(`<i>Text 222</i>`);
	canvas.AddBlockText(`[sadgioio;fhioweafhoweaf]`);
	canvas.AddInlineText("Text 333Text444");
	canvas.AddInlineButton("Button", ()=>{
		console.log("Clicked.");
		canvas.UnregisterAll();

		canvas.AddBackgroundClick(() => {
			console.log("Background left clicked.");
			canvas.UnregisterAll();
		})
	});
	canvas.AddInlineText("Text 555");
	canvas.AddMeter(3, 0, 10);

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