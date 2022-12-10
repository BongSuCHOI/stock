import { prisma } from '../../prisma/db';

export default async function handler(req, res) {
	const data = await prisma.Stock_Item.findMany({
		select: {
			STK_TD: true,
		},
	});
	res.json(data);
}
