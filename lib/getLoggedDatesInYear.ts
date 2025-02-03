import { prisma } from '@/prisma/client';

export const getLoggedDatesInYear = async (year: number, userId: string) => {
  return await prisma.workdaySentiment.findMany({
    where: {
      userId,
      date: {
        lte: new Date(year, 11, 31, 23, 59, 59, 999),
        gte: new Date(year, 0, 1, 0, 0, 0, 0),
      },
    },
  });
};
