/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#020202',
				backgroundSecondary: '#141413',
				backgroundThird: '#323232',
				border: '#363636',
				borderActive: '#555555',
				borderSecondary: '#484848',
			},
		},
	},
	plugins: [],
}

