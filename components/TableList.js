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
				const { name, code, prevClose, prevCloseDiff, prevCloseRate, ma5, ma20, prevVolume, marketCap } = data;
				const updown = Number(prevCloseRate) > 0 ? 'text-red-500' : 'text-blue-600';

				return (
					<tr key={code} className="border-b border-slate-200">
						<td className="py-4 text-left text-lg">
							{name}
							<span className="block text-xs text-slate-500">{code}</span>
						</td>
						<td className="py-4 text-right text-lg">
							{prevClose}
							<span className={`block text-xs ${updown}`}>{prevCloseDiff}</span>
						</td>
						<td className={`py-4 text-right text-lg ${updown}`}>{prevCloseRate}%</td>
						{ma5 && <td className="py-4 text-right text-lg">{ma5}</td>}
						{ma20 && <td className="py-4 text-right text-lg">{ma20}</td>}
						{marketCap && <td className="py-4 text-right text-lg">{marketCap}</td>}
						<td className="py-4 text-right text-lg">{prevVolume}</td>
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
