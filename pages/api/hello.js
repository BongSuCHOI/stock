// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const posts = await prisma.themed_stocks.findMany();
	res.json(posts);
}
