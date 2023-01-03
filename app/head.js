'use client';

import Script from 'next/script';

export default function Head() {
	return (
		<>
			<Script id="google-tag-manager" src="https://www.googletagmanager.com/gtag/js?id=G-QCK9GFTZTJ" async>{`
				window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QCK9GFTZTJ');
			`}</Script>
		</>
	);
}
