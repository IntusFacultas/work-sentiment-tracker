import { AccessDenied } from '@/components/client/authentication/AccessDenied';
import { prisma } from '@/prisma/client';
import { auth } from 'auth/auth';
import { getLoggedDatesInYear } from '@/lib/getLoggedDatesInYear';
import { WorkdayTracker } from '@/components/client/WorkdayTracker/WorkdayTracker';
import { WorkSentiment } from '@prisma/client';
export default async function Index() {
  const session = await auth();

  if (!session?.accessToken || !session?.user?.id) {
    return <AccessDenied />;
  }

  const loadLoggedDates = async () => {
    'use server';
    const loggedDates = await getLoggedDatesInYear(
      new Date().getFullYear(),
      session.user!.id!,
    );
    return loggedDates;
  };

  const deleteWorkday = async (date: Date) => {
    'use server';
    try {
      await prisma.workdaySentiment.deleteMany({
        where: {
          userId: session.user!.id!,
          date: {
            lte: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              23,
              59,
              59,
              999,
            ),
            gte: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,
              0,
              0,
              0,
            ),
          },
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const submitWorkday = async (data: FormData, date: Date = new Date()) => {
    'use server';
    const session = await auth();
    const sentiment = data.get('sentiment');
    // delete the sentiment for today if it exists to have the sentiment submission be idempotent
    await deleteWorkday(date);
    await prisma.workdaySentiment.create({
      data: {
        date: date,
        sentiment: sentiment as WorkSentiment,
        userId: session!.user!.id!,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <WorkdayTracker
        deleteWorkday={deleteWorkday}
        submitWorkday={submitWorkday}
        loadLoggedDates={loadLoggedDates}
      />
    </div>
  );
}
