import { BoundedVariable } from "../DataStructure/BoundedVariable.js"

export class Chara {
	姓名: string = "丽佳";

	体力 = new BoundedVariable("体力", 0, 100, 100);
	清洁度 = new BoundedVariable("清洁度", 0, 100, 100);

	M开发度 = new BoundedVariable("M开发度", 0, 100, 0);
	B开发度 = new BoundedVariable("B开发度", 0, 100, 0);
	C开发度 = new BoundedVariable("C开发度", 0, 100, 0);
	V开发度 = new BoundedVariable("V开发度", 0, 100, 0);
	A开发度 = new BoundedVariable("A开发度", 0, 100, 0);
}