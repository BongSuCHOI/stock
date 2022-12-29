export default function TableList({ headRows, listData }) {
	const tHeadRows = headRows.map((row, idx, arr) => {
		const w = arr.length === 6 ? 'w-28' : 'w-40';
		const display = row === '전일 거래량' || row === '시가총액' ? 'hidden sm:table-cell' : 'table-cell';

		return (
			<th key={row} className={`${w} ${display} first:w-40 last:w-40 py-2 text-right first:text-left`}>
				{row}
			</th>
		);
	});

	const tBodyColumn =
		listData.length > 0 ? (
			listData.map((data) => {
				const { name, code, market, close, marketCap, volume, volumeRate, closeDiff, closeRate } = data;
				const updown = Number(closeRate) > 0 ? 'text-red-600' : 'text-blue-600';

				return (
					<tr key={code} className="border-b border-slate-200">
						<td className="py-4 text-left text-base sm:text-lg">
							<a href={`https://finance.naver.com/item/main.naver?code=${code}`} target="_blank" rel="noreferrer" className="hover:text-slate-500 transition-all">
								{name}
								<span className="block text-[10px] leading-3 sm:text-xs text-slate-500">
									{code} / {market}
								</span>
							</a>
						</td>
						<td className="py-4 text-right text-base sm:text-lg">
							{close}
							<span className={`block text-xs ${updown}`}>{closeDiff}</span>
						</td>
						<td className={`py-4 text-right text-base sm:text-lg ${updown}`}>{closeRate}%</td>
						{volumeRate && <td className="py-4 text-right text-base sm:text-lg">{volumeRate}%</td>}
						{marketCap && <td className="py-4 text-right text-base sm:text-lg hidden sm:table-cell">{marketCap}</td>}
						<td className="py-4 text-right text-base sm:text-lg hidden sm:table-cell">{volume}</td>
					</tr>
				);
			})
		) : (
			<tr className="border-b border-slate-200">
				<td colSpan="6" className="w-full py-4 text-center text-base sm:text-lg text-slate-500">
					카테고리에 일치하는 전일 종목 없음
				</td>
			</tr>
		);

	return (
		<table className="w-full mt-3 sm:mt-5">
			<thead>
				<tr className="border-b-2 border-black text-xs sm:text-sm">{tHeadRows}</tr>
			</thead>
			<tbody>{tBodyColumn}</tbody>
		</table>
	);
}
