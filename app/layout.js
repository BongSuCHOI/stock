import '@/styles/globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="ko">
			<head>
				<title>주식</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
