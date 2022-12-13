// import { getCategory } from 'prisma/db';

import Category from '@components/Category';

import '@/styles/globals.css';

export default async function RootLayout({ children }) {
	// const categoryData = await getCategory();

	return (
		<html lang="ko">
			<head>
				<title>주식</title>
			</head>
			<body>
				<div className="max-w-screen-lg px-4 mx-auto relative">
					<div className="my-20 text-center">
						<h1 className="text-8xl font-semibold">STOCK</h1>
						<h2 className="text-base mt-2 font-light">
							테마별 상위 시가총액 종목과
							<br />
							MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다.
						</h2>
					</div>
					{/* <Category categoryData={categoryData} /> */}
					{children}
				</div>
			</body>
		</html>
	);
}
