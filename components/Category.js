'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Category({ categoryData }) {
	const pathName = usePathname();
	const decodePath = decodeURI(pathName);

	const CategoryList = categoryData.map((data) => {
		const activeClass = decodePath === `/theme/${data.STK_TD}` ? 'bg-slate-700 text-white' : 'bg-slate-100';
		return (
			<li key={data.STK_TD} className="inline-block">
				<Link
					href={`/theme/${encodeURIComponent(data.STK_TD)}`}
					className={`text-sm sm:text-base block px-4 py-2 rounded-full ${activeClass} hover:bg-slate-700 hover:text-white transition-all`}>
					{data.STK_TD}
				</Link>
			</li>
		);
	});

	return (
		<section className="py-2.5 border-y border-[#d9dadb] sticky top-0 bg-white/75 backdrop-blur-sm">
			<ul className="whitespace-nowrap space-x-2 overflow-x-scroll text-center scrollbar-hide">
				<li className="inline-block">
					<Link href={'/'} className={`text-sm sm:text-base block px-4 py-2 rounded-full ${decodePath === '/' ? 'bg-slate-700 text-white' : 'bg-slate-100'}`}>
						전체
					</Link>
				</li>
				{CategoryList}
			</ul>
		</section>
	);
}
