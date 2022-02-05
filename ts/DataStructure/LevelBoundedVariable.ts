import { threadId } from "worker_threads";
import { BoundedVariable } from "./BoundedVariable";

function sortDict(src) {
	return Object.keys(src).sort().reduce(
		(obj, key) => { 
			obj[key] = src[key]; 
			return obj;
		}, 
		{}
	);
}

export class LevelBoundedVariable extends BoundedVariable {
	public threshold2levelName: { [index: number]: string } = {};

	public constructor(name: string, min: number, max: number, threshold2levelName: { [index: number]: string }, value?: number) {
		super(name, min, max, value);
		this.threshold2levelName = sortDict(threshold2levelName);
	}
}

export function LBV_GetLevelName(v: LevelBoundedVariable) {
	let res: string;
	for (let threshold of Object.keys(v.threshold2levelName).map(Number)) {
		if(threshold <= v.value)
			res = v.threshold2levelName[threshold];
		else
			break;
	}
	return res;
}