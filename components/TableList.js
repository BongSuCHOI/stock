export default function TableList({ headRows, listData }) {
	const tHeadRows = headRows.map((row, idx, arr) => {
		const w = arr.length === 6 ? 'w-28' : 'w-40';
		return (
			<th key={row} className={`${w} first:w-40 last:w-40 py-2 text-right first:text-left`}>
				{row}
			</th>
		);
	});

	const tBodyColumn =
		listData.length > 0 ? (
			listData.map((data) => {
				const { name, code, close, closeDiff, closeRate, ma5, ma20, volume, marketCap, volumeRate } = data;
				const updown = Number(closeRate) > 0 ? 'text-red-500' : 'text-blue-600';

				return (
					<tr key={code} className="border-b border-slate-200">
						<td className="py-4 text-left text-lg">
							{name}
							<span className="block text-xs text-slate-500">{code}</span>
						</td>
						<td className="py-4 text-right text-lg">
							{close}
							<span className={`block text-xs ${updown}`}>{closeDiff}</span>
						</td>
						<td className={`py-4 text-right text-lg ${updown}`}>{closeRate}%</td>
						{ma5 && <td className="py-4 text-right text-lg">{ma5}</td>}
						{ma20 && <td className="py-4 text-right text-lg">{ma20}</td>}
						{volumeRate && <td className="py-4 text-right text-lg">{volumeRate}%</td>}
						{marketCap && <td className="py-4 text-right text-lg">{marketCap}</td>}
						<td className="py-4 text-right text-lg">{volume}</td>
					</tr>
				);
			})
		) : (
			<tr className="border-b border-slate-200">
				<td colSpan="6" className="w-full py-4 text-center text-lg text-slate-400">
					카테고리에 일치하는 전일 종목 없음
				</td>
			</tr>
		);

	return (
		<table className="w-full mt-5">
			<thead>
				<tr className="border-b-2 border-black text-sm">{tHeadRows}</tr>
			</thead>
			<tbody>{tBodyColumn}</tbody>
		</table>
	);
}
