'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Category({ categoryData }) {
	const pathName = usePathname();
	const decodePath = decodeURI(pathName);

	const CategoryList = categoryData
		.filter((data, idx, callback) => {
			// 중복 키값 제거
			return idx === callback.findIndex((arr) => arr.STK_TD === data.STK_TD);
		})
		.map((data) => {
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
		<div className="py-2 border-y border-slate-200">
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
