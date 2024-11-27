import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { User } from './models/User';

function clearSessionAuth(res: NextResponse) {
  res.cookies.delete('next-auth.session-token');
  res.cookies.delete('next-auth.csrf-token');
  res.cookies.delete('next-auth.callback-url');
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const res = NextResponse.next();

  if (!token) return res; // no token = no auth = no bitches

  const user = await User.findById(token.id);
  if (!user) clearSessionAuth(res); // lost auth = take bitches away

  return NextResponse.next();
}

export const config = {
  matcher: ['*'],
};
