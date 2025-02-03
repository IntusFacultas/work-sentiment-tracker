import { auth, signIn, signOut } from '@/auth/auth';
import { Header as ClientHeader } from '../client/Header';
import { prisma } from '@/prisma/client';
import { User } from '@prisma/client';

export const Header = async () => {
  const onSignIn = async () => {
    'use server';
    await signIn();
  };

  const onSignOut = async () => {
    'use server';
    await signOut();
  };

  const onAddBuddy = async (buddy: User) => {
    'use server';
    try {
      const session = await auth();
      console.log(session, buddy);
      await prisma.user.update({
        where: {
          id: session!.user!.id,
        },
        data: {
          invitedBuddies: {
            connect: {
              id: buddy.id,
            },
          },
        },
        include: {
          invitedBuddies: true,
        },
      });
      return true;
    } catch (error) {
      console.log('What the fuck happened', error);
      return false;
    }
  };

  const onSearchForBuddy = async (buddyCode: string): Promise<User | null> => {
    'use server';
    const buddy = await prisma.user.findUnique({
      where: {
        buddyCode,
      },
    });
    return buddy ?? null;
  };

  const onRemoveBuddy = async (buddyID: string) => {
    'use server';
    try {
      const session = await auth();
      await prisma.user.update({
        where: {
          id: session!.user!.id,
        },
        data: {
          invitedBuddies: {
            disconnect: {
              id: buddyID,
            },
          },
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const session = await auth();

  const loadInvitedBuddies = async () => {
    'use server';
    const session = await auth();
    const result = await prisma.user.findUnique({
      where: {
        id: session!.user!.id,
      },
      include: {
        invitedBuddies: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return result?.invitedBuddies ?? [];
  };

  return (
    <ClientHeader
      loadInvitedBuddies={loadInvitedBuddies}
      onRemoveBuddy={onRemoveBuddy}
      onAddBuddy={onAddBuddy}
      onSearchForBuddy={onSearchForBuddy}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      session={session}
    />
  );
};
