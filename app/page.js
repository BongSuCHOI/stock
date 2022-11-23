import Category from '@components/Category';
import ContentsTitle from '@components/ContentsTitle';
import TableList from '@components/TableList';

export default function RootPage() {
	const DUMMY_data = [
		{ name: 'SK이노베이션', code: '234534', prevClose: '170,500', prevCloseDiff: '800', prevCloseRate: '1.16', ma5: '170,400', ma20: '170,025', prevVolume: '1,111,354,579' },
		{ name: 'POSCO홀딩스', code: '153423', prevClose: '288,500', prevCloseDiff: '1000', prevCloseRate: '-0.35', ma5: '288,400', ma20: '288,025', prevVolume: '2,644,578' },
	];
	const DUMMY_data2 = [
		{ name: 'SK이노베이션', code: '234534', prevClose: '170,500', prevCloseDiff: '800', prevCloseRate: '1.16', test: '170,025', prevVolume: '1,111,354,579' },
		{ name: 'POSCO홀딩스', code: '153423', prevClose: '288,500', prevCloseDiff: '1000', prevCloseRate: '-0.35', test: '2,134,288,025', prevVolume: '2,644,578' },
	];
	const DUMMY_data_zero = [];

	return (
		<div className="max-w-screen-lg px-4 mx-auto relative">
			<div className="my-20 text-center">
				<h1 className="text-8xl font-semibold">STOCK</h1>
				<h2 className="text-base mt-2 font-light">
					테마별 상위 시가총액 종목과
					<br />
					MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다.
				</h2>
			</div>
			<Category />
			<div className="mt-12">
				<ContentsTitle title="골드크로스" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', 'MA 5일', 'MA 20일', '전일 거래량']} listData={DUMMY_data} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="데드크로스" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', 'MA 5일', 'MA 20일', '전일 거래량']} listData={DUMMY_data_zero} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="시가총액 TOP 5" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={DUMMY_data2} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="거래량 증가" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '거래량 증가율', '전일 거래량']} listData={DUMMY_data_zero} />
			</div>
		</div>
	);
}
