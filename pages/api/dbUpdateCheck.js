import { getThemeData } from '@util/db';

export default async function handler(req, res) {
	const { APP_KEY } = process.env;
	const { ACCESS_KEY } = req.headers.authorization.split(' ')[1];
    const allStockData = await getThemeData('all');

    console.log(allStockData);

	try {
		if (ACCESS_KEY === APP_KEY) {
			console.log('인증 성공');

			// Process the POST request
			res.status(200).json({ success: 'true' });
		} else {
			console.log('인증 실패');

			res.status(401);
		}
	} catch (err) {
		console.log('catch');

		res.status(500);
	}
}
