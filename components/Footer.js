import Image from 'next/image';

export default function Footer() {
	return (
		<section className="flex items-center justify-center flex-col md:flex-row py-12 px-2 md:px-0 mt-24 sm:mt-32 bg-slate-200">
			<div className="opacity-20 mb-6 md:mb-0 md:mr-6">
				<Image className="mx-auto" src="/images/logo.svg" width={180} height={30} alt="STOCK" />
			</div>
			<div className="text-sm opacity-50 border-t md:border-l md:border-t-0 border-slate-500 pt-6 md:pt-0 md:pl-6">
				<p className="mb-4">
					개미집(GAEMIJIB)은 사이트 내 모든 종목 가격 및 투자 관련 정보에 대하여 어떠한 책임을 부담하지 않습니다.
					<br />
					디지털 자산 투자는 전적으로 스스로의 책임이므로 이에 유의하시기 바랍니다.
				</p>
				<p>
					피드백 또는 광고 문의 : <a href="#">https://test.com</a>
				</p>
			</div>
		</section>
	);
}
