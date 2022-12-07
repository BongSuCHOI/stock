import { prisma } from '../../prisma/db';

function getPrevDate(prevDayCount) {
	const oneDayTime = 1000 * 60 * 60 * 24;
	const prevDate = new Date() - oneDayTime * prevDayCount;
	const date = new Date(prevDate);
	const year = date.getFullYear();
	const month = ('0' + (1 + date.getMonth())).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return year + month + day;
}

export default async function handler(req, res) {
	// 주말 제외 평일 기준으로 오늘 날짜부터 특정 일수 이전 날짜 구하는 로직 필요
	const prevDate = getPrevDate(30);

	const posts = await prisma.Stock_Item.findMany({
		where: {
			STK_TD: { not: '' },
		},
		include: {
			stk_ohlcv: {
				where: {
					STK_YEAR: { gte: prevDate },
				},
			},
		},
	});
	res.json(posts);
}
