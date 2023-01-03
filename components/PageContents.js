'use client';

import { useState, useMemo, useRef } from 'react';

import ContentsTitle from '@components/ContentsTitle';
import TableList from '@components/TableList';
import { DESCENDING_SORT, A_TO_B_PERCENT, MA } from '@util/calc';

export default function PageContents(props) {
	const [shortMA, setShortMA] = useState(20);
	const [longMA, setLongMA] = useState(60);
	const [isMASetOpen, setIsMASetOpen] = useState(false);

	const shortRef = useRef(null);
	const longRef = useRef(null);

	const stockData = useMemo(() => processingkData(props.stockData, shortMA, longMA), [props.stockData, shortMA, longMA]);

	const goldCrossData = stockData
		.filter((data) => {
			const { currentMAShort, currentMALong, prevMA5, prevMALong } = data;
			return prevMA5 <= prevMALong && currentMAShort > currentMALong;
		})
		.map((data) => {
			const { currentMAShort, currentMALong, volumeRate, ...other } = data;
			return other;
		});

	const marketCap5 = DESCENDING_SORT(stockData, 'marketCap', 6).map((data) => {
		const { currentMAShort, currentMALong, volumeRate, ...other } = data;
		return other;
	});

	const volume5 = DESCENDING_SORT(stockData, 'volume', 6).map((data) => {
		const { currentMAShort, currentMALong, volumeRate, ...other } = data;
		return other;
	});

	const increaseVolume = stockData
		.filter((data) => data.volumeRate > 0)
		.map((data) => {
			const { currentMAShort, currentMALong, marketCap, ...other } = data;
			return other;
		});

	const maSetOpenHandler = () => {
		setIsMASetOpen(true);
	};

	const maSetCloseHandler = () => {
		setIsMASetOpen(false);
	};

	const setMAHandler = (e) => {
		e.preventDefault();

		const shortMA = Number(shortRef.current.value);
		const longMA = Number(longRef.current.value);

		if (shortMA >= longMA) {
			alert('단기 이평선의 길이는 장기 이평선보다 크거나 같을 수 없습니다.');
			return;
		} else if (shortMA > 200 || longMA > 200) {
			alert('설정 가능한 이평선의 최대 길이는 200입니다.');
			return;
		} else if (shortMA < 5 || longMA < 5) {
			alert('설정 가능한 이평선의 최소 길이는 5입니다.');
			return;
		}

		setShortMA(shortMA);
		setLongMA(longMA);
		setIsMASetOpen(false);
	};

	return (
		<>
			<section className="pt-6 sm:pt-12 px-2 lg:px-0">
				<div className="mt-8 sm:mt-12">
					<div className="flex items-center justify-between">
						<ContentsTitle
							title="골드크로스"
							desc="단기 이동 평균이 장기 이동 평균을 위로 돌파하는 종목을 보여줍니다.<br />
					(금일 단기 이동 평균 &lt; 금일 장기 이동 평균, 이전 단기 이동 평균 &gt;= 이전 장기 이동 평균 두 가지 경우가 일치하는 종목)<br />
					*추세는 고려되지 않습니다."
						/>
						<button className="rounded px-3 h-8 bg-slate-700 hover:bg-slate-800 text-white transition-all text-sm sm:text-base sm:h-9" onClick={maSetOpenHandler}>
							이평선 설정
						</button>
					</div>
					<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={goldCrossData} />
				</div>
				<div className="mt-16 mt-24">
					<ContentsTitle title="시가총액 TOP 5" desc="시가 총액이 제일 높은 상위 5개 종목을 보여줍니다." />
					<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={marketCap5} />
				</div>
				<div className="mt-16 mt-24">
					<ContentsTitle title="거래량 TOP 5" desc="거래량이 제일 높은 상위 5개 종목을 보여줍니다." />
					<TableList headRows={['종목명', '전일 종가', '전일 등락률', '시가총액', '전일 거래량']} listData={volume5} />
				</div>
				<div className="mt-16 mt-24">
					<ContentsTitle title="거래량 증가" desc="이전일 거래량보다 금일 거래량이 상승한 종목을 보여줍니다." />
					<TableList headRows={['종목명', '전일 종가', '전일 등락률', '거래량 증가율', '전일 거래량']} listData={increaseVolume} />
				</div>
			</section>
			{isMASetOpen && (
				<div className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl p-6 pt-5 shadow-[0_0_15px_1px_rgb(0,0,0,0.08)]">
					<form onSubmit={setMAHandler}>
						<p className="text-center font-bold text-lg mb-4 sm:text-xl sm:mb-6">이동평균선 설정</p>
						<label className="block mb-2 text-sm font-bold" htmlFor="shortMA">
							단기 이평선
						</label>
						<input ref={shortRef} id="shortMA" type="number" defaultValue={shortMA} name="단기 이평선 길이" className="block border border-slate-400 rounded w-60 h-10 text-center mb-4" />
						<label className="block mb-2 text-sm font-bold" htmlFor="longMA">
							장기 이평선
						</label>
						<input ref={longRef} id="longMA" type="number" defaultValue={longMA} name="장기 이평선 길이" className="block border border-slate-400 rounded w-60 h-10 text-center mb-6" />
						<div className="flex items-center justify-between">
							<button type="button" className="rounded w-[47.5%] h-9 bg-slate-200 hover:bg-slate-300 transition-all text-sm sm:text-base" onClick={maSetCloseHandler}>
								취소
							</button>
							<button type="submit" className="rounded w-[47.5%] h-9 bg-slate-700 hover:bg-slate-800 text-white transition-all text-sm sm:text-base">
								적용
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}

const processingkData = (stockData, shortMA, longMA) => {
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

		const currentMAShort = MA(ohlcv.slice(-shortMA), shortMA);
		const currentMALong = MA(ohlcv.slice(-longMA), longMA);

		const prevMAShort = MA(ohlcv.slice(-shortMA - 1, -1), shortMA);
		const prevMALong = MA(ohlcv.slice(-longMA - 1, -1), longMA);

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
			currentMAShort,
			currentMALong,
			prevMA5: prevMAShort,
			prevMALong,
		};
	});
};
