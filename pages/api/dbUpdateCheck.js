import { getThemeData } from '@util/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const allStockData = await getThemeData('all');
		console.log(allStockData);
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.APP_KEY}`) {
				console.log('인증 성공');
				res.status(200).json({ success: true });
			} else {
				console.log('인증 실패');
				res.status(401).json({ success: false });
			}
		} catch (err) {
			console.log('catch');
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
