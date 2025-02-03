'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FunctionComponent } from 'react';

export const AccessDenied: FunctionComponent<{
  message?: string;
}> = ({ message = 'You must be signed in to view this page' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1>Access Denied</h1>
      <p>
        <Link
          href="/api/auth/signin"
          onClick={e => {
            e.preventDefault();
            void signIn();
          }}
        >
          {message}
        </Link>
      </p>
    </div>
  );
};
