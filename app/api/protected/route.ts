import { auth } from 'auth/auth';
import { NextRequest } from 'next/server';

type AppRouteHandler<TReturnType = void> = (req: NextRequest) => TReturnType;

export const GET = auth(req => {
  if (req.auth) {
    return Response.json({ data: 'Protected data' });
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
}) as AppRouteHandler;
