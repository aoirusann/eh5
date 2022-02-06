import { BoundedVariable } from "./BoundedVariable.js";

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
	public threshold2level: { [index: number]: any } = {};

	public constructor(name: string, min: number, max: number, threshold2levelName: { [index: number]: any }, value?: number) {
		super(name, min, max, value);
		this.threshold2level = sortDict(threshold2levelName);
	}
}

export function LBV_GetLevel(v: LevelBoundedVariable) {
	let res;
	for (let threshold of Object.keys(v.threshold2level).map(Number)) {
		if(threshold <= v.value)
			res = v.threshold2level[threshold];
		else
			break;
	}
	return res;
}

export function LBV_GetThreshold(v: LevelBoundedVariable, targetLevel) {
	for (let threshold of Object.keys(v.threshold2level).map(Number)) {
		let level = v.threshold2level[threshold];
		if(level == targetLevel)
			return threshold;
	}
	console.error("Undefined level " + targetLevel.toString());
}