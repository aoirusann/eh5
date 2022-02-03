export class BoundedVariable {
	public min: number;
	public max: number;
	public value: number;

	public constructor(min: number, max: number, value?: number) {
		this.min = min;
		this.max = max;
		this.value = value ? value : min;
	}
}