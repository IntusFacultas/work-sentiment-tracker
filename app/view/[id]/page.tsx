import { AccessDenied } from '@/components/client/authentication/AccessDenied';
import { prisma } from '@/prisma/client';
import { auth } from 'auth/auth';
import { getLoggedDatesInYear } from '@/lib/getLoggedDatesInYear';
import { WorkdayTracker } from '@/components/client/WorkdayTracker/WorkdayTracker';
export default async function Index({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  const user = session?.user;

  if (!session?.accessToken || !user?.id) {
    return <AccessDenied />;
  }

  const userToView = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      invitedBuddies: {
        select: {
          id: true,
        },
      },
    },
  });

  if (
    !userToView ||
    !userToView.invitedBuddies.some(buddy => buddy.id === session.user!.id)
  ) {
    return <AccessDenied message="You are not authorized to view this user" />;
  }

  const loadLoggedDates = async () => {
    'use server';
    const loggedDates = await getLoggedDatesInYear(
      new Date().getFullYear(),
      id,
    );
    return loggedDates;
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const deleteWorkday = async (_date: Date) => {
    'use server';
    // noop
    return true;
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const submitWorkday = async (_data: FormData, _date: Date = new Date()) => {
    'use server';
    // noop
  };

  return (
    <div className="flex flex-col gap-6">
      <WorkdayTracker
        deleteWorkday={deleteWorkday}
        submitWorkday={submitWorkday}
        loadLoggedDates={loadLoggedDates}
        viewingUser={userToView}
      />
    </div>
  );
}
