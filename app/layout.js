import Category from '@components/Category';
import { VercelAnalytics } from '@components/VercelAnalytics';
import TradingviewTickerWidget from '@components/tradingview/TickerWidget';
import TradingviewChartWidget from '@components/tradingview/ChartWidget';
import LogoSection from '@components/LogoSection';
import Footer from '@components/Footer';

import { getCategory } from '@util/db';

import '@/styles/globals.css';

export default async function RootLayout({ children }) {
	const categoryData = await getCategory();

	return (
		<html lang="ko">
			<head>
				<title>개미집 - 테마별 상위 시가총액, 거래량, 거래량 증가, MA 골드크로스/데드크로스 종목</title>
				<meta charSet="utf-8"></meta>
				<meta name="title" content="개미집" />
				<meta name="viewport" content="width=device-width,initial-scale=1.0" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="keywords"
					content="국내주식,골드크로스,데드크로스,국장,국내주식테마,주식테마,테마종목,테마정보,주식정보,테마주,코스피,코스닥,급등,급등주,주식,시가총액순위,시총순위,거래량순위,거래량증가"
				/>
				<meta name="description" content="테마별 상위 시가총액, 거래량 종목과 거래량 증가 종목, MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다." />
				<meta property="og:type" content="Website" />
				<meta property="og:title" content="개미집" />
				<meta property="og:url" content="https://gaemijib.vercel.app/" />
				<meta property="og:description" content="테마별 상위 시가총액, 거래량 종목과 거래량 증가 종목, MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다." />
				<meta property="og:image" content="https://gaemijib.vercel.app/images/share_logo.jpg" />
				<link rel="canonical" href="https://gaemijib.vercel.app/" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
			</head>
			<body>
				<div className="max-w-screen-lg mx-auto relative">
					<TradingviewTickerWidget />
					<LogoSection />
					<TradingviewChartWidget />
					<Category categoryData={categoryData} />
					{children}
					<Footer />
					<VercelAnalytics />
				</div>
			</body>
		</html>
	);
}
