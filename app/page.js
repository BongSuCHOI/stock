import { getThemeData } from 'prisma/db';

import PageContents from '../components/PageContents';

export default async function RootPage() {
	const allStockData = await getThemeData('all');
	return <PageContents stockData={allStockData} />;
}
