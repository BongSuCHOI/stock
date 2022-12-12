import PageContents from '../components/PageContents';

async function getAllStock() {
	const req = await fetch('http://localhost:3000/api/stock/all');
	const res = await req.json();
	return res;
}

export default async function RootPage() {
	const allStockData = await getAllStock();

	// 임시로 가격데이터 비어있는거 필터링 원인 찾아서 수정해야함
	const test = allStockData.filter((data) => data.stk_ohlcv.length > 0);

	return <PageContents stockData={test} />;
}