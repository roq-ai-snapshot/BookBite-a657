import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { promotionValidationSchema } from 'validationSchema/promotions';
import { convertQueryToPrismaUtil } from '../../../server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPromotions();
    case 'POST':
      return createPromotion();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPromotions() {
    const data = await prisma.promotion.findMany(convertQueryToPrismaUtil(req.query, 'promotion'));
    return res.status(200).json(data);
  }

  async function createPromotion() {
    await promotionValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.promotion.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
