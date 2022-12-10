export default function ContentsTitle({ title }) {
	return (
		<h3 className="flex align-center text-2xl font-semibold">
			{title}
			<div className="relative">
				<button className="peer ml-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
						<g fill="none" fillRule="evenodd">
							<circle cx="8" cy="8" r="7.5" fill="#FFF" stroke="#a0a5ad"></circle>
							<path fill="#a0a5ad" d="M7.5 7H8.5V12H7.5z"></path>
							<circle cx="8" cy="5" r="1" fill="#a0a5ad"></circle>
						</g>
					</svg>
				</button>
				<div className="opacity-0 invisible absolute peer-hover:visible peer-hover:opacity-100 text-sm font-normal p-5 rounded-2xl bg-slate-100 w-72 max-w-xs transition-all">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book.
				</div>
			</div>
		</h3>
	);
}
