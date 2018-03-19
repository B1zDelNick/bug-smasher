export class HandyUtils {
	public static shuffleArray(array: any[]): any[] {
		let currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	public static intToTime(val: number): string {
		let min = Math.floor(val / 60);
		let sec = val - min * 60;
		let minStr = min.toString().length === 1 ? '0' + min : min.toString();
		let secStr = sec.toString().length === 1 ? '0' + sec : sec.toString();
		return minStr + ':' + secStr;
	}

	public static contains(el: any, array: any[]): boolean {
		for (let e of array) {
			if (e === el)
				return true;
		}
		return false;
	}
}