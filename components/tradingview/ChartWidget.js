'use client';

import Script from 'next/script';

export default function ChartWidget() {
	return (
		<div className="tv-widget-container h-96 pb-5">
			<div id="tradingview_f6e3e" className='h-full'></div>
			<Script
				id="tv-chart-widget"
				src="https://s3.tradingview.com/tv.js"
				onLoad={() => {
					new TradingView.widget({
						autosize: true,
						symbol: 'KRX:KOSPI',
						interval: 'D',
						timezone: 'Asia/Seoul',
						theme: 'light',
						style: '1',
						locale: 'kr',
						toolbar_bg: '#f1f3f6',
						enable_publishing: false,
						allow_symbol_change: true,
						save_image: false,
						container_id: 'tradingview_f6e3e',
					});
				}}></Script>
		</div>
	);
}
