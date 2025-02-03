'use client';
import { Button } from '@/components/client/foundation/Button';
import { FunctionComponent, ComponentPropsWithRef } from 'react';

export const SignIn: FunctionComponent<
  {
    onSignIn: () => Promise<void>;
  } & ComponentPropsWithRef<typeof Button>
> = ({ onSignIn, ...props }) => {
  return (
    <form action={onSignIn}>
      <Button {...props}>Sign In</Button>
    </form>
  );
};
