
export class TimeUtil {
	public static addDay(now: number, day: number):number {
		return now + day * 24 * 60 * 60 * 1000;
	}
	public static addHour(now: number, hour: number):number {
		return now + hour * 60 * 60 * 1000;
	} 
	public static addMinute(now: number, minute: number):number {
		return now + minute * 60 * 1000;
	}
	public static addSecond(now: number, second: number):number {
		return now + second * 1000;
	}
	public static addMillisecond(now: number, millisecond: number):number {
		return now + millisecond;
	}

	public static getDay = (now: number) => new Date(now).getDay();
	public static getHour = (now: number) => new Date(now).getHours();
	public static getMinute = (now: number) => new Date(now).getMinutes();
	public static getSeconds = (now: number) => new Date(now).getSeconds();
	public static getMilliseconds = (now: number) => new Date(now).getMilliseconds();

	public static getString = (now: number) => new Date(now).toString();
}
