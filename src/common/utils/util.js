import dayjs from "dayjs";
export const getNearMounth = () => {
	let arr = []
	let todayTimeStamp = Date.now()
	for (let i = 0; i < 5; i++) {
		const nowTime = dayjs(todayTimeStamp + 86400000 * i).format('YYYY-MM-DD')
		let dayMark = dayjs(nowTime).day()
		console.log(nowTime, dayMark)
		switch (dayMark) {
			case 1:
				dayMark = "周一";
				break;
			case 2:
				dayMark = "周二";
				break;
			case 3:
				dayMark = "周三";
				break;
			case 4:
				dayMark = "周四";
				break;
			case 5:
				dayMark = "周五";
				break;
			case 6:
				dayMark = "周六";
				break;
			case 0:
				dayMark = "周日";
				break;
		}
		arr.push({
			year: nowTime.substring(0,4),
			date: nowTime.substring(5),
			week: dayMark
		})
	}

	return arr
}
