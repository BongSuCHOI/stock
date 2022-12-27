import { getThemeData, getCategory } from 'prisma/db';

import PageContents from '../../../components/PageContents';

export default async function ThemePage({ params }) {
	const themeStockData = await getThemeData(decodeURI(params.slug));
	return <PageContents stockData={themeStockData} />;
}

export async function generateStaticParams() {
	const categoryData = await getCategory();
	const category = categoryData.filter((data, idx, callback) => idx === callback.findIndex((arr) => arr.STK_TD === data.STK_TD));

	return category.map((data) => ({
		slug: data.STK_TD,
	}));
}
