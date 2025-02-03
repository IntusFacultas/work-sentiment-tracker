import { User } from 'next-auth';
import { User as DBUser } from '@prisma/client';
import { Avatar, AvatarImage } from '../foundation/Avatar';
import { FunctionComponent } from 'react';

export const UserAvatar: FunctionComponent<{ user: User | DBUser }> = ({
  user,
}) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={
          user.image ??
          `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`
        }
        alt={user.name ?? ''}
      />
    </Avatar>
  );
};
