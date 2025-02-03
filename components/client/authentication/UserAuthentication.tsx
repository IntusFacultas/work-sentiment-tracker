'use client';
import { Button } from '@/components/client/foundation/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/client/foundation/DropdownMenu';
import { SignIn } from './SignIn';
import { SignOut } from './SignOut';
import { Session } from 'next-auth';
import { FunctionComponent } from 'react';
import { UserAvatar } from './UserAvatar';

type UserAuthenticationProps = {
  session: Session | null;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onCopyBuddyCode: () => void;
  onAddBuddy: () => void;
  onRemoveBuddy: () => void;
};
export const UserAuthentication: FunctionComponent<UserAuthenticationProps> = ({
  session,
  onSignIn,
  onCopyBuddyCode,
  onSignOut,
  onAddBuddy,
  onRemoveBuddy,
}) => {
  if (!session?.user) {
    return <SignIn onSignIn={onSignIn} variant="ghost" />;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatar user={session.user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Button
              onClick={onCopyBuddyCode}
              className="text-center"
              size="fluid"
              variant="ghost"
            >
              Copy Buddy Code
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={onAddBuddy}
              className="text-center"
              size="fluid"
              variant="ghost"
            >
              Add Buddy
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={onRemoveBuddy}
              className="text-center"
              size="fluid"
              variant="ghost"
            >
              Manage Buddies
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut onSignOut={onSignOut} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
