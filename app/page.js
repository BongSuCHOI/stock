import ContentsTitle from '@components/ContentsTitle';
import TableList from '@components/TableList';
import { DESCENDING_SORT, A_TO_B_PERCENT, MA } from '@/lib/calc';

async function getAllStock() {
	const req = await fetch('http://localhost:3000/api/allStock');
	const res = await req.json();
	return res;
}

export default async function RootPage() {
	const allStockData = await getAllStock();

	// 로직 수정해야할거같음 한번에 map에서 다 계산하는건 비효율적이지않을까
	const processingStockData = allStockData.map((data) => {
		const currentOHLCV = data.stk_ohlcv[data.stk_ohlcv.length - 1];
		const prevOHLCV = data.stk_ohlcv[data.stk_ohlcv.length - 2];

		const currentClosePrice = currentOHLCV.STK_CLOSE;
		const currentVolume = currentOHLCV.STK_VOLUME;
		const prevClosePrice = prevOHLCV.STK_CLOSE;
		const prevVolume = prevOHLCV.STK_VOLUME;

		const closeDiff = currentClosePrice - prevClosePrice;
		const closeRate = A_TO_B_PERCENT(currentClosePrice, prevClosePrice);
		const volumeRate = A_TO_B_PERCENT(currentVolume, prevVolume);
		const ma5 = MA(data.stk_ohlcv.slice(-5), 5);
		const ma20 = MA(data.stk_ohlcv.slice(-20), 20);

		return {
			name: data.STK_NM,
			code: data.STK_CD,
			market: data.STK_MK,
			theme: data.STK_TD,
			close: currentClosePrice,
			marketCap: '37,900,000',
			volume: currentVolume.toString(),
			volumeRate,
			closeDiff,
			closeRate,
			ma5,
			ma20,
		};
	});

	const goldCrossData = processingStockData
		.filter((data) => {
			const { ma5, ma20 } = data;
			return ma5 > ma20;
		})
		.map((arr) => {
			const { marketCap, volumeRate, ...other } = arr;
			return other;
		});

	const deadCrossData = processingStockData
		.filter((data) => {
			const { ma5, ma20 } = data;
			return ma5 < ma20;
		})
		.map((arr) => {
			const { marketCap, volumeRate, ...other } = arr;
			return other;
		});

	const marketCap5 = DESCENDING_SORT(processingStockData, 'marketCap', 5).map((arr) => {
		const { ma5, ma20, volumeRate, ...other } = arr;
		return other;
	});

	const volume5 = DESCENDING_SORT(processingStockData, 'volume', 5).map((arr) => {
		const { ma5, ma20, volumeRate, ...other } = arr;
		return other;
	});

	const increaseVolume = processingStockData
		.filter((data) => data.volumeRate > 0)
		.map((arr) => {
			const { marketCap, ma5, ma20, ...other } = arr;
			return other;
		});

	return (
		<div className="">
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
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '거래량 증가율', '전일 거래량']} listData={increaseVolume} />
			</div>
		</div>
	);
}
