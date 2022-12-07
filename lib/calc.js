// 내림차순 정렬 (db에 어떻게 찍히는지 보고 로직 수정 필요)
// export const DESCENDING_SORT = (arr, len) => arr.sort((a, b) => b - a).slice(0, len);
export const DESCENDING_SORT = (arr, key, len) => {
	return arr
		.sort((a, b) => {
			const A = a[key].replaceAll(',', '');
			const B = b[key].replaceAll(',', '');
			return B - A;
		})
		.slice(0, len - 1);
};

// 이동 평균선
export const MA = (datas, length) => datas.reduce((acc, curr) => (acc += curr.STK_CLOSE), 0) / length;

// 전일비 퍼센트
export const A_TO_B_PERCENT = (curr, prev) => (curr / (prev / 100) - 100).toFixed(2);

// 3자리 마다 콤마 (문자열)
export const STRING_TO_PRICE = (price) => price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 3자리 마다 콤마 (숫자)
export const NUMBER_TO_PRICE = (price) => price.toLocaleString('ko-KR');
