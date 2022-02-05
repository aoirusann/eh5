class Rand {
	/**
	 * @returns an integer `x` in [min, max)
	 */
	public Integer(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	/**
	 * @returns a float `x` in [min, max)
	 */
	public Float(min, max) {
		return Math.random() * (max - min) + min;
	}

	private selectItems = [];
	private selectProbs = [];
	/**
	 * Call this before you want to start selecting.
	 * Select works in the way of Russian roulette.
	 */
	public StartSelect() {
		this.selectItems = [];
		this.selectProbs = [];
	}
	/**
	 * @param prob float or integer are both ok, default is 1.
	 */
	public AddSelect(item, prob: number=1) {
		this.selectItems.push(item);
		this.selectItems.push(prob);
	}
	/**
	 * @returns The randomly selected item will be returned.
	 */
	public EndSelect() {
		if(this.selectItems.length == 0)
			return null;

		let totalProb = 0;
		for (const prob of this.selectProbs) {
			totalProb += prob;
		}

		let selectProb = this.Float(0, totalProb);
		let curProb = 0;
		for(let i=0; i<this.selectItems.length; i++) {
			curProb += this.selectProbs[i];
			if(curProb > selectProb)
				return this.selectItems[i];
		}
		throw "Some error happend in Rand.EndSelect";
	}
}
export let rand = new Rand();