'use client';
import Image from 'next/image';
import CustomLink from '../../foundation/CustomLink';
import React, { FunctionComponent } from 'react';
import { Button } from '../../foundation/Button';

export const NavigationMenu: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-4">
      <CustomLink href="/" className="flex items-center gap-2">
        <Button variant="ghost" className="p-0">
          <Image
            src="/logo.png"
            alt="Home"
            width="48"
            height="48"
            className="min-w-8"
          />
        </Button>
      </CustomLink>
      <h1>Work Sentiment Tracker</h1>
    </div>
  );
};
