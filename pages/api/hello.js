import { prisma } from '../../prisma/db';

export default async function handler(req, res) {
	const posts = await prisma.Stock_Item.findMany({
		select: {
			STK_TD: true,
		},
	});
	res.json(posts);
}
