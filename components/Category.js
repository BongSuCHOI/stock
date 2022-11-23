import Link from 'next/link';

export default function Category() {
	return (
		<div className="py-2 border-y border-slate-200">
			<ul className="flex items-center justify-center space-x-2">
				<li className="px-4 py-2 bg-slate-700 rounded-full text-white">
					<Link href="/">2차전지</Link>
				</li>
				<li className="px-4 py-2 bg-slate-100 rounded-full">
					<Link href="/">네옴시티</Link>
				</li>
				<li className="px-4 py-2 bg-slate-100 rounded-full">
					<Link href="/">건설</Link>
				</li>
				<li className="px-4 py-2 bg-slate-100 rounded-full">
					<Link href="/">철강</Link>
				</li>
				<li className="px-4 py-2 bg-slate-100 rounded-full">
					<Link href="/">구제역/광우병 수혜</Link>
				</li>
			</ul>
		</div>
	);
}
