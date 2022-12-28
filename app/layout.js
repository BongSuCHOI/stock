import { getCategory } from 'prisma/db';

import Category from '@components/Category';
import TradingviewTickerWidget from '@components/tradingview/TickerWidget';
import TradingviewChartWidget from '@components/tradingview/ChartWidget';

import '@/styles/globals.css';

export default async function RootLayout({ children }) {
	const categoryData = await getCategory();

	return (
		<html lang="ko">
			<head>
				<title>주식</title>
			</head>
			<body>
				<div className="max-w-screen-lg px-4 mx-auto relative">
					<TradingviewTickerWidget />
					<div className="my-20 text-center">
						<h1 className="text-8xl font-bold">STOCK</h1>
						<h2 className="text-base mt-6 font-normal">
							테마별 상위 시가총액 종목과
							<br />
							MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다.
							<br />
							<p className='text-xs leading-6 text-slate-500'>(모든 종목은 리페인팅 방지를 위해 당일 장 마감 후 계산되어 반영됩니다.)</p>
						</h2>
					</div>
					<TradingviewChartWidget />
					<Category categoryData={categoryData} />
					{children}
				</div>
			</body>
		</html>
	);
}
