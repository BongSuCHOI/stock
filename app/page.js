import PageContents from '../components/PageContents';
import prisma from 'prisma/db';

async function getAllStock() {
	const prevDate = calcDate(30);

	const data = await prisma.Stock_Item.findMany({
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
	return data;
}

export default async function RootPage() {
	const allStockData = await getAllStock();

	// 임시로 가격데이터 비어있는거 필터링 원인 찾아서 수정해야함
	const test = allStockData.filter((data) => data.stk_ohlcv.length > 0);

	return <PageContents stockData={test} />;
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
