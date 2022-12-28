/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './page/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			height: {
				'72px': '72px',
			},
			colors: {
				'tv-border': '#d9dadb',
			},
			fontSize: {
				'10px': '10px',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
