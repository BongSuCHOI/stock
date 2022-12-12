import PageContents from '../../../components/PageContents';

async function getThemeStock(theme) {
	const req = await fetch(`${process.env.BASE_URL}api/stock/${theme}`);
	const res = await req.json();
	return res;
}

export default async function ThemePage({ params }) {
	const themeStockData = await getThemeStock(decodeURI(params.slug));

	// 임시로 가격데이터 비어있는거 필터링 원인 찾아서 수정해야함
	const test = themeStockData.filter((data) => data.stk_ohlcv.length > 0);

	return <PageContents stockData={test} />;
}
