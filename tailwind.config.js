/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './page/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			height: {
				'72px': '72px',
			},
			colors: {
				'tv-border': '#d9dadb',
			},
		},
	},
	plugins: [],
};
