import { canvas } from "./Canvas.js"
import { ins } from "./InstructionSet.js"
import { GameData } from "./GameData/GameData.js"
import { TimeUtility } from "./TimeUtility.js";
import { sm } from "./ScriptManager.js";
import { gdm } from "./GameDataManager.js";

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
	let dataStr = gdm.SerializeGameData(data);
	console.log(dataStr);
	let dataStrObj = gdm.DeserializeGameData(dataStr);
	console.log(dataStrObj);
	let dataStrObjStr = gdm.SerializeGameData(dataStrObj);
	console.log(dataStrObjStr);
}

function _test_alias() {
	ins.ltxt(`233`);
}

function* _script_sub() {
	ins.btxt(`这里是sub哦！`);
	ins.btxt(`所以就算你从这里出去了，外面也还有坏人在等着你的哦！`);
	while(true) {
		let afraid = false;
		ins.lbtn(`不怕！`, ()=>afraid=false);
		ins.lbtn(`怕……`, ()=>afraid=true);
		yield;
		if(!afraid) {
			ins.btxt(`哦豁？~不怕啊？不怕的话那就滚出去吧~
那么喜欢main的话就去找她呗~
哼~`);
			ins.btxt(`你被赶出去了……`)
			return;
		}
		ins.btxt(`不怕不怕~有sub在这里陪你哦~
摸头摸头~`);
		ins.waitclick();
		ins.btxt(`还怕吗？~`);
	}
}

function* _script_main() {
	ins.btxt(`你好啊~`);
	ins.btxt(`那接下来你先点一下屏幕哦？`);
	yield ins.waitclick();
	yield _script_sub();
	ins.btxt(`不错，确实点上了呢~`);
	ins.btxt(`那再点一下下面的按钮试试？`);
	yield ins.lbtn(`点我！`, ()=> console.log("Pressed."));
	ins.btxt(`被点了❤`);
	ins.btxt(`那就到这里啦~拜拜~`);
	return;
}

function _test_script() {
	sm.Push(_script_main());
	sm.Continue();
}

export function TestSimple() {
	//_test_canvas();
	_test_gamedata();
	//_test_alias();
	//_test_script();
}