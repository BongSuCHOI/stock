import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;

export const getCategory = async () => {
	const data = await prisma.Stock_Item.findMany({
		select: {
			STK_TD: true,
		},
	});
	return data;
};

export const getThemeData = async (theme) => {
	const data = await prisma.Stock_Item.findMany({
		where: {
			STK_TD: theme === 'all' ? { not: '' } : theme,
		},
		include: {
			stk_ohlcv: {
				where: {
					STK_YEAR: { gte: calcDate(30) },
				},
			},
		},
	});
	return data;
};

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
