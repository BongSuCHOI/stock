'use client';

import { getThemeData } from 'prisma/db';

import PageContents from '../../../components/PageContents';

export default async function ThemePage({ params }) {
	const themeStockData = await getThemeData(decodeURI(params.slug));
	// 임시로 가격데이터 비어있는거 필터링 원인 찾아서 수정해야함
	const test = themeStockData.filter((data) => data.stk_ohlcv.length > 0);

	return <PageContents stockData={test} />;
}
