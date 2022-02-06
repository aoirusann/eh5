export class BoundedVariable {
	public name: string;
	public min: number;
	public max: number;
	public value: number;

	public constructor(name: string, min: number, max: number, value?: number) {
		this.name = name;
		this.min = min;
		this.max = max;
		this.value = value ? value : min;
	}
}

export function BV_Add(bv: BoundedVariable, amount: number): number {
	let overflow: number = 0;

	bv.value += amount;
	if(bv.value < bv.min) {
		overflow = bv.value - bv.min;
		bv.value = bv.min;
	}
	if(bv.value > bv.max) {
		overflow = bv.value - bv.max;
		bv.value = bv.max;
	}

	return overflow;
}