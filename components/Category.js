'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Category({ categoryData }) {
	const pathName = usePathname();
	const decodePath = decodeURI(pathName);

	const CategoryList = categoryData.map((data) => {
		const activeClass = decodePath === `/theme/${data.STK_TD}` ? 'bg-slate-700 text-white' : 'bg-slate-100';
		return (
			<li key={data.STK_TD}>
				<Link href={`/theme/${encodeURIComponent(data.STK_TD)}`} className={`block px-4 py-2 rounded-full ${activeClass} hover:bg-slate-700 hover:text-white transition-all`}>
					{data.STK_TD}
				</Link>
			</li>
		);
	});

	return (
		<div className="py-2.5 border-y border-slate-200 sticky top-0 bg-white/75 backdrop-blur-sm">
			<ul className="flex items-center justify-center space-x-2">
				<li>
					<Link href={'/'} className={`block px-4 py-2 rounded-full ${decodePath === '/' ? 'bg-slate-700 text-white' : 'bg-slate-100'}`}>
						전체
					</Link>
				</li>
				{CategoryList}
			</ul>
		</div>
	);
}
