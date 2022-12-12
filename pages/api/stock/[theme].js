import prisma from '../../../prisma/db';

export default async function handler(req, res) {
	const prevDate = calcDate(30);
	const { theme } = req.query;

	const data = await prisma.Stock_Item.findMany({
		where: {
			STK_TD: theme === 'all' ? { not: '' } : theme,
		},
		include: {
			stk_ohlcv: {
				where: {
					STK_YEAR: { gte: prevDate },
				},
			},
		},
	});
	res.json(data);
}

function calcDate(limit) {
	const today = new Date();
	let count = 0;
	let prevDate;

	while (true) {
		const tempDate = today;

		const temp = tempDate.getDay();
		if (temp !== 0 && temp !== 6) {
			prevDate = tempDate;
			count++;
			if (count === limit) {
				break;
			}
		}
		tempDate.setDate(today.getDate() - 1);
	}

	const year = prevDate.getFullYear();
	const month = ('0' + (1 + prevDate.getMonth())).slice(-2);
	const day = ('0' + prevDate.getDate()).slice(-2);

	return year + month + day;
}
