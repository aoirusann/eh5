
export class TimeUtility {
	public static day = (value: number) => this.hour(value * 24);
	public static hour = (value: number) => this.minute(value * 60);
	public static minute = (value: number) => this.second(value * 60);
	public static second = (value: number) => this.millisecond(value * 1000);
	public static millisecond = (value: number) => value;

	public static addDay(now: number, value: number):number {
		return now + this.day(value);
	}
	public static addHour(now: number, value: number):number {
		return now + this.hour(value);
	} 
	public static addMinute(now: number, value: number):number {
		return now + this.minute(value);
	}
	public static addSecond(now: number, value: number):number {
		return now + this.second(value);
	}
	public static addMillisecond(now: number, value: number):number {
		return now + this.millisecond(value);
	}

	// January - December : 0 – 11
	public static getMonth = (now: number) => new Date(now).getMonth();
	// 1 - 31
	public static getDate = (now: number) => new Date(now).getDate();
	// Sunday - Saturday : 0 - 6
	public static getDay = (now: number) => new Date(now).getDay();
	// 0 - 23
	public static getHour = (now: number) => new Date(now).getHours();
	// 0 - 59
	public static getMinute = (now: number) => new Date(now).getMinutes();
	// 0 - 59
	public static getSeconds = (now: number) => new Date(now).getSeconds();
	// 0 - 999
	public static getMilliseconds = (now: number) => new Date(now).getMilliseconds();

	public static isWorkday = (now: number): boolean => {
		let nowDay = this.getDay(now);
		return nowDay != 0 && nowDay != 6;
	}

	/**
	 * 从当前时刻curHour:curMinute，向前推进时间，直到目标时刻targetHour:targetMinute。
	 * 若当前时刻大于目标时刻，则会导致日期向前推进一天。
	 * hour: 0-23
	 * minute: 0-59
	 */
	public static calClockDiff = (curHour: number, curMinute: number, targetHour: number, targetMinute: number): number => {
		if(this.isClockEarlier(curHour, curMinute, targetHour, targetMinute))
			targetHour += 24;
		let curClockTime = TimeUtility.hour(curHour) + TimeUtility.minute(curMinute);
		let targetClockTime = TimeUtility.hour(targetHour) + TimeUtility.minute(targetMinute);
		let diff = targetClockTime - curClockTime;
		return diff;
	}
	/**
	 * @returns true if curHour:curMinute < targetHour: targetMinute
	 */
	public static isClockEarlier = (curHour: number, curMinute: number, targetHour: number, targetMinute: number): boolean => {
		if(curHour < targetHour)
			return true;
		else if(curHour == targetHour && curMinute < targetMinute)
			return true;
		else
			return false;
	}
	/**
	 * 若start > end, 那我们经过零点进行判定。
	 * 例如[22:00, 2:00)中包含0:00，但不包含4:00。
	 * @returns true if curHour:curMinute in [startHour:startMinute, endHour:endMinute).
	 */
	public static isClockInInterval(
		startHour: number, startMinute: number,
		curHour: number, curMinute: number,
		endHour: number, endMinute: number,
	): boolean {
		if(this.isClockEarlier(endHour, endMinute, startHour, startMinute)) {
			endHour += 24;
			if(this.isClockEarlier(curHour, curMinute, startHour, startMinute))
				curHour += 24;
		}
		if(this.isClockEarlier(curHour, curMinute, startHour, startMinute))
			return false;
		else if(!this.isClockEarlier(curHour, curMinute, endHour, endMinute))
			return false;
		else
			return true;
	}

	public static getClockString = (now: number) => new Date(now).toLocaleTimeString();
}
