import { ins } from "./InstructionSet.js"
import { gd, Power, Time } from "./GameData/GameData.js";
import { Action } from "./Action.js"
import { Load, Save } from "../core/Storage.js";
import { gdm } from "../core/GameDataManager.js";
import { LBV_GetLevel, LBV_GetThreshold } from "./DataStructure/LevelBoundedVariable.js";

import * as 钻入 from "./Sex/钻入.js"

function* TimeChanged() {
	// ======= 丽佳的行动 =======
	// 起床睡觉
	switch(gd.time) {
		case Time.深夜:
			ins.btxt(`${gd.her.name}睡着了。`);
			ins.bvto(gd.her.wakeness, 30);
			break;
		case Time.早上:
			ins.btxt(`${gd.her.name}醒来了。`);
			ins.bvto(gd.her.wakeness, 100);
			break;
		case Time.上午:
			ins.btxt(`${gd.her.name}去上学了。`);
			break;
		case Time.黄昏:
			ins.btxt(`${gd.her.name}回家了。`);
			break;
	}
}

function* TopStatusBar() {
	ins.textStyle = "status_text";
	ins.word = `时间：${Time[gd.time]}`
	ins.word = `雄性力量：${gd.power.value}(${Power[LBV_GetLevel(gd.power)]})`
}

export function* Panel() {
	let cur_day = -1;
	let cur_time = Time.Invalid;
	while(true) {
		ins.separator("=");

		if(cur_time != gd.time || cur_day != gd.day) {
			cur_day = gd.day;
			cur_time = gd.time;
			yield TimeChanged();
			ins.separator();
		}

		yield TopStatusBar();
		ins.separator();

		// sex actions
		let BuildAll = (s) => {
			for (const action of s)
				action.BuildButton();
		};
		BuildAll(钻入.actions);
		ins.separator();

		// common actions
		new Action(
			"等到深夜",
			() => {
				gd.time = Time.深夜;
			},
			() => gd.time != Time.深夜
		).BuildButton();
		new Action(
			"今天就到这里",
			() => {
				gd.day++;
				gd.time = Time.上午;
			}
		).BuildButton();
		ins.separator();

		// system actions
		new Action(
			"存档",
			() => {
				Save("SaveData0", gd);
				ins.btxt("存档成功。");
			}
		).BuildButton();
		new Action(
			"读档",
			() => {
				let data = Load("SaveData0");
				if(data) {
					gdm.UpdateFrom(gd, data);
					ins.btxt("读档成功。");
				}
				else {
					ins.btxt("没有存档。");
				}
			}
		).BuildButton();
		ins.separator();

		yield;
	}
}