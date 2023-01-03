'use client';

import Script from 'next/script';

export default function TickerWidget() {
	return (
		<div className='w-full overflow-x-scroll scrollbar-hide'>
			<div className="tv-widget-container h-[72px] w-[1024px] lg:w-full">
				<Script
					id="tv-ticker-widget"
					src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
					async
					onLoad={() => {
						const widget = document.getElementById('tv-ticker-widget');

						if (!widget.parentElement.hasAttribute('class')) {
							widget.parentElement.remove();
						}

						document.querySelector('.tv-widget-container').appendChild(widget);
					}}>
					{JSON.stringify({
						symbols: [
							{
								description: 'KOSPI',
								proName: 'KRX:KOSPI',
							},
							{
								description: 'KOSDAQ',
								proName: 'KRX:KOSDAQ',
							},
							{
								description: 'NASDAQ 100',
								proName: 'NASDAQ:NDX',
							},
							{
								description: 'S&P 500',
								proName: 'FOREXCOM:SPXUSD',
							},
							{
								description: 'HSI',
								proName: 'HSI:HSI',
							},
						],
						colorTheme: 'light',
						isTransparent: false,
						showSymbolLogo: true,
						locale: 'kr',
					})}
				</Script>
			</div>
		</div>
	);
}
