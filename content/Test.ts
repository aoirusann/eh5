import { ins } from "./InstructionSet.js"

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

export function* TestScript() {
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