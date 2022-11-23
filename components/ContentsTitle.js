export default function ContentsTitle({ title }) {
	return (
		<h3 className="flex align-center text-2xl font-semibold">
			{title}
			<button className="ml-2">
				<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
					<g fill="none" fillRule="evenodd">
						<circle cx="8" cy="8" r="7.5" fill="#FFF" stroke="#a0a5ad"></circle>
						<path fill="#a0a5ad" d="M7.5 7H8.5V12H7.5z"></path>
						<circle cx="8" cy="5" r="1" fill="#a0a5ad"></circle>
					</g>
				</svg>
			</button>
		</h3>
	);
}
