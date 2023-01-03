/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './page/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			width: {
				'47.5%': '47.5%',
			},
			height: {
				'72px': '72px',
			},
			colors: {
				'tv-border': '#d9dadb',
			},
			fontSize: {
				'10px': '10px',
			},
			translate: {
				'-50%': '-50%',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
