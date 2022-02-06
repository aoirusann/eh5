import { BoundedVariable } from "../DataStructure/BoundedVariable.js"
import { LevelBoundedVariable } from "../DataStructure/LevelBoundedVariable.js";

export enum 洁癖程度 {
	龌龊喜爱,
	无视脏污,
	邋里邋遢,
	比较随便,
	一般,
	爱干净,
	重度洁癖,
}

export enum 清醒程度 {
	昏迷,
	昏睡,
	模糊,
	清醒,
	精神,
}

export enum 敏感程度 {
	无感,
	钝感,
	一般,
	敏感,
	性感,
}

export class 开发度 extends LevelBoundedVariable {
	public constructor(name: string, value?: number) {
		super(name, 0, 100,
			{
				 0: 敏感程度.无感,
				10: 敏感程度.钝感,
				30: 敏感程度.一般,
				50: 敏感程度.敏感,
				70: 敏感程度.性感,
			},
			value
		);
	}
}

export class CharaState {
	name: string = "丽佳";

	strength = new BoundedVariable("体力", 0, 100, 100);
	wakeness = new LevelBoundedVariable(
		"清醒度", 0, 100,
		{
			0: 清醒程度.昏迷,
			25: 清醒程度.昏睡,
			50: 清醒程度.模糊,
			60: 清醒程度.清醒,
			90: 清醒程度.精神,
		},
		70
	)
	cleanliness = new LevelBoundedVariable(
		"洁癖度", 0, 100,
		{
			0: 洁癖程度.龌龊喜爱,
			30: 洁癖程度.无视脏污,
			40: 洁癖程度.邋里邋遢,
			50: 洁癖程度.比较随便,
			70: 洁癖程度.一般,
			80: 洁癖程度.爱干净,
			90: 洁癖程度.重度洁癖,
		},
		70
	);

	M = new 开发度("M开发度");
	B = new 开发度("B开发度");
	C = new 开发度("C开发度");
	V = new 开发度("V开发度");
	A = new 开发度("A开发度");
}