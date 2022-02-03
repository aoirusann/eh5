import { canvas } from "./Canvas.js"
import { is } from "./ScriptInstructions.js"
import { DeserializeGameData, GameData, SerializeGameData } from "./GameData.js"
import { TimeUtil } from "./TimeUtil.js";
import { sm } from "./ScriptManager.js";

function _test_canvas() {
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
}

function _test_gamedata() {
	let data: GameData = new GameData();
	let dataStr = SerializeGameData(data);
	console.log(dataStr);
	let dataStrObj = DeserializeGameData(dataStr);
	dataStrObj.time = TimeUtil.addHour(dataStrObj.time, 5);
	console.log(dataStrObj);
	let dataStrObjStr = SerializeGameData(dataStrObj);
	console.log(dataStrObjStr);
}

function _test_alias() {
	is.ltxt(`233`);
}

function* _script_sub() {
	is.btxt(`这里是sub哦！`);
	is.btxt(`所以就算你从这里出去了，外面也还有坏人在等着你的哦！`);
	while(true) {
		let afraid = false;
		is.lbtn(`不怕！`, ()=>afraid=false);
		is.lbtn(`怕……`, ()=>afraid=true);
		yield;
		if(!afraid) {
			is.btxt(`哦豁？~不怕啊？不怕的话那就滚出去吧~
那么喜欢main的话就去找她呗~
哼~`);
			is.btxt(`你被赶出去了……`)
			return;
		}
		is.btxt(`不怕不怕~有sub在这里陪你哦~
摸头摸头~`);
		is.waitclick();
		is.btxt(`还怕吗？~`);
	}
}

function* _script_main() {
	is.btxt(`你好啊~`);
	is.btxt(`那接下来你先点一下屏幕哦？`);
	yield is.waitclick();
	yield _script_sub();
	is.btxt(`不错，确实点上了呢~`);
	is.btxt(`那再点一下下面的按钮试试？`);
	yield is.lbtn(`点我！`, ()=> console.log("Pressed."));
	is.btxt(`被点了❤`);
	is.btxt(`那就到这里啦~拜拜~`);
	return;
}

function _test_script() {
	sm.Push(_script_main());
	sm.Continue();
}

window.onload = () => {
	_test_script();
}