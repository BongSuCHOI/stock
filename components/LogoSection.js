import Image from 'next/image';

export default function LogoSection() {
	return (
		<section className="my-12 sm:my-24 text-center">
			<h1 className="w-6/12 sm:w-full mx-auto">
				<Image className="mx-auto" src="/images/logo.svg" width={360} height={90} alt="STOCK" />
			</h1>
			<h2 className="text-xs sm:text-base mt-4 sm:mt-6 font-normal">
				테마별 상위 시가총액, 거래량 종목과 거래량 증가 종목,
				<br />
				MA(이동평균선) 골드크로스/데드크로스 종목을 알려드립니다.
				<br />
				<span className="block text-[10px] sm:text-xs leading-6 text-slate-500">(모든 종목은 리페인팅 방지를 위해 당일 장 마감 후 계산되어 반영됩니다.)</span>
			</h2>
		</section>
	);
}
