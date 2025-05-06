import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface IRoutes {
  [key: string]: boolean;
}
const publicOnyUrls: IRoutes = {
  '/': true,
  '/login': true,
  '/create-account': true,
  // "/profile": true,
};

export async function middleware(request: NextRequest) {
  // const session = await getSession();
  const session = request.cookies.get('karrot-infomation');
  const exists = publicOnyUrls[request.nextUrl.pathname];

  // if (exists) {
  // 	if (session.id) {
  // 		return NextResponse.redirect(new URL("/profile", request.url));
  // 	}
  // }

  if (!exists && !session.id) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
