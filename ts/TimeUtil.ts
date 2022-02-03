
export class TimeUtil {
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

	public static getClockString = (now: number) => new Date(now).toLocaleTimeString();
}
