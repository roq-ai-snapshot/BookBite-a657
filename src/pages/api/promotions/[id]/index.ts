import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { promotionValidationSchema } from 'validationSchema/promotions';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPromotionById();
    case 'PUT':
      return updatePromotionById();
    case 'DELETE':
      return deletePromotionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPromotionById() {
    const data = await prisma.promotion.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updatePromotionById() {
    await promotionValidationSchema.validate(req.body);
    const data = await prisma.promotion.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePromotionById() {
    const data = await prisma.promotion.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
