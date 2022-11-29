import Category from '@components/Category';
import ContentsTitle from '@components/ContentsTitle';
import TableList from '@components/TableList';
import { DESCENDING_SORT } from '@/lib/calc';

export default function RootPage() {
	const DUMMY_data = [
		{
			name: 'SK이노베이션',
			code: '234534',
			prevClose: '170,500',
			prevCloseDiff: '800',
			prevCloseRate: '1.16',
			ma5: '170,400',
			ma20: '170,025',
			marketCap: '37,900,000',
			prevVolume: '1,111,354,579',
		},
		{
			name: 'POSCO홀딩스',
			code: '153423',
			prevClose: '288,500',
			prevCloseDiff: '1000',
			prevCloseRate: '-0.35',
			ma5: '288,400',
			ma20: '288,025',
			marketCap: '2,428,500,000',
			prevVolume: '2,644,578',
		},
		{ name: '테스트', code: '234523', prevClose: '1,500', prevCloseDiff: '800', prevCloseRate: '1.16', ma5: '1,480', ma20: '1,525', marketCap: '353,300,000', prevVolume: '1,111,354,579' },
		{
			name: '더미더미더미',
			code: '723455',
			prevClose: '288,500',
			prevCloseDiff: '1000',
			prevCloseRate: '-0.35',
			ma5: '2,400',
			ma20: '2,825',
			marketCap: '198,900,000',
			prevVolume: '2,644,578',
		},
		{
			name: 'POSCO홀딩스',
			code: '555354',
			prevClose: '288,500',
			prevCloseDiff: '1000',
			prevCloseRate: '-0.35',
			ma5: '288,400',
			ma20: '288,025',
			marketCap: '1,418,500,000',
			prevVolume: '2,644,578',
		},
		{ name: '테스트', code: '342345', prevClose: '1,500', prevCloseDiff: '800', prevCloseRate: '1.16', ma5: '1,480', ma20: '1,525', marketCap: '7,353,300,000', prevVolume: '1,111,354,579' },
		{
			name: '더미더미더미',
			code: '123453',
			prevClose: '288,500',
			prevCloseDiff: '1000',
			prevCloseRate: '-0.35',
			ma5: '2,400',
			ma20: '2,825',
			marketCap: '912,900,000',
			prevVolume: '2,644,578',
		},
	];
	const DUMMY_data_zero = [];

    // 임시로 해놨지만 사실상 ma는 따로 계산해야할듯 우선 db 연결하고 로직 수정
	const goldCrossData = DUMMY_data.filter((data) => {
		const { ma5, ma20 } = data;
		return ma5 > ma20;
	}).map((arr) => {
		const { marketCap, ...other } = arr;
		return other;
	});

	const deadCrossData = DUMMY_data.filter((data) => {
		const { ma5, ma20 } = data;
		return ma5 < ma20;
	}).map((arr) => {
		const { marketCap, ...other } = arr;
		return other;
	});

	const marketCap5 = DESCENDING_SORT(DUMMY_data, 'marketCap', 5).map((arr) => {
		const { ma5, ma20, ...other } = arr;
		return other;
	});

	const volume5 = DESCENDING_SORT(DUMMY_data, 'prevVolume', 5).map((arr) => {
		const { ma5, ma20, ...other } = arr;
		return other;
	});

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
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', 'MA 5일', 'MA 20일', '전일 거래량']} listData={goldCrossData} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="데드크로스" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', 'MA 5일', 'MA 20일', '전일 거래량']} listData={deadCrossData} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="시가총액 TOP 5" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={marketCap5} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="거래량 TOP 5" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={volume5} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="거래량 증가" />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '거래량 증가율', '전일 거래량']} listData={DUMMY_data_zero} />
			</div>
		</div>
	);
}
