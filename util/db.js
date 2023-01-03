import { cache } from 'react';
import { PrismaClient } from '@prisma/client';
// import 'server-only';

let prisma;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export const getCategory = async () => {
	const data = await prisma.Stock_Item.findMany({
		select: {
			STK_TD: true,
		},
	});

	// 중복 키값 제거
	const result = data.filter((data, idx, callback) => idx === callback.findIndex((arr) => arr.STK_TD === data.STK_TD));
	return result;
};

export const getThemeData = async (theme) => {
	const data = await prisma.Stock_Item.findMany({
		where: {
			STK_TD: theme === 'all' ? { not: '' } : theme,
		},
		include: {
			stk_ohlcv: {
				where: {
					STK_YEAR: { gte: calcDate(250) },
				},
			},
		},
	});

	// 가격 데이터 없는 종목 필터링
	const result = data.filter((d) => d.stk_ohlcv.length > 0);
	return result;
};

const calcDate = cache((limit) => {
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
});
