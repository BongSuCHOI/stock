import ContentsTitle from '@components/ContentsTitle';
import TableList from '@components/TableList';
import { DESCENDING_SORT, A_TO_B_PERCENT, MA } from '@/lib/calc';

export default function PageContents(props) {
	const stockData = processingkData(props.stockData);

	const goldCrossData = stockData
		.filter((data) => {
			const { currentMA5, currentMA20, prevMA5, prevMA20 } = data;
			return prevMA5 <= prevMA20 && currentMA5 > currentMA20;
		})
		.map((data) => {
			const { currentMA5, currentMA20, volumeRate, ...other } = data;
			return other;
		});

	const deadCrossData = stockData
		.filter((data) => {
			const { currentMA5, currentMA20, prevMA5, prevMA20 } = data;
			return prevMA5 >= prevMA20 && currentMA5 < currentMA20;
		})
		.map((data) => {
			const { currentMA5, currentMA20, volumeRate, ...other } = data;
			return other;
		});

	const marketCap5 = DESCENDING_SORT(stockData, 'marketCap', 6).map((data) => {
		const { currentMA5, currentMA20, volumeRate, ...other } = data;
		return other;
	});

	const volume5 = DESCENDING_SORT(stockData, 'volume', 6).map((data) => {
		const { currentMA5, currentMA20, volumeRate, ...other } = data;
		return other;
	});

	const increaseVolume = stockData
		.filter((data) => data.volumeRate > 0)
		.map((data) => {
			const { currentMA5, currentMA20, marketCap, ...other } = data;
			return other;
		});

	return (
		<div className="pt-12 pb-24">
			<div className="mt-12">
				<ContentsTitle
					title="골드크로스"
					desc="단기 이동 평균(5일)이 장기 이동 평균(20일) 위로 교차하는 종목을 보여줍니다.<br />
					(금일 단기 이동 평균 < 금일 장기 이동 평균, 이전 단기 이동 평균 >= 이전 장기 이동 평균 두 가지 경우가 일치하는 종목)<br />
					*추세는 고려되지 않습니다."
				/>
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={goldCrossData} />
			</div>
			<div className="mt-24">
				<ContentsTitle
					title="데드크로스"
					desc="단기 이동 평균(5일)이 장기 이동 평균(20일) 아래로 교차하는 종목을 보여줍니다.<br />
					(금일 단기 이동 평균 > 금일 장기 이동 평균, 이전 단기 이동 평균 <= 이전 장기 이동 평균 두 가지 경우가 일치하는 종목)<br />
					*추세는 고려되지 않습니다."
				/>
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={deadCrossData} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="시가총액 TOP 5" desc="시가 총액이 제일 높은 상위 5개 종목을 보여줍니다." />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={marketCap5} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="거래량 TOP 5" desc="거래량이 제일 높은 상위 5개 종목을 보여줍니다." />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={volume5} />
			</div>
			<div className="mt-24">
				<ContentsTitle title="거래량 증가" desc="이전일 거래량보다 금일 거래량이 상승한 종목을 보여줍니다." />
				<TableList headRows={['종목명', '전일 종가', '전일 등락률', '거래량 증가율', '전일 거래량']} listData={increaseVolume} />
			</div>
		</div>
	);
}

const processingkData = (stockData) => {
	return stockData.map((data) => {
		const { stk_ohlcv: ohlcv } = data;

		const currentOHLCV = ohlcv[ohlcv.length - 1];
		const prevOHLCV = ohlcv[ohlcv.length - 2];

		const currentClosePrice = currentOHLCV.STK_CLOSE;
		const prevClosePrice = prevOHLCV.STK_CLOSE;

		const currentVolume = currentOHLCV.STK_VOLUME;
		const prevVolume = prevOHLCV.STK_VOLUME;

		const closeDiff = currentClosePrice - prevClosePrice;
		const closeRate = A_TO_B_PERCENT(currentClosePrice, prevClosePrice);

		const volumeRate = A_TO_B_PERCENT(currentVolume, prevVolume);

		const currentMA5 = MA(ohlcv.slice(-5), 5);
		const currentMA20 = MA(ohlcv.slice(-20), 20);

		const prevMA5 = MA(ohlcv.slice(-6, -1), 5);
		const prevMA20 = MA(ohlcv.slice(-21, -1), 20);

		return {
			name: data.STK_NM,
			code: data.STK_CD,
			market: data.STK_MK,
			close: currentClosePrice.toLocaleString('ko-KR'),
			marketCap: '37,900,000',
			volume: currentVolume.toLocaleString('ko-KR'),
			volumeRate,
			closeDiff,
			closeRate,
			currentMA5,
			currentMA20,
			prevMA5,
			prevMA20,
		};
	});
};
