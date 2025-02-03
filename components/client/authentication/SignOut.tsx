'use client';
import { Button } from '@/components/client/foundation/Button';
import { FunctionComponent, ComponentPropsWithRef } from 'react';

export const SignOut: FunctionComponent<
  ComponentPropsWithRef<typeof Button> & {
    onSignOut: () => Promise<void>;
  }
> = ({ onSignOut, ...props }) => {
  return (
    <form action={onSignOut} className="w-full">
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
};
