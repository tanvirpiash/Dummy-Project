import { NextResponse } from 'next/server';

export function middleware(request) {
   if (!request.cookies.get('user_name')) {
      return NextResponse.redirect(new URL('/login', request.url));
   }
   return NextResponse.next();
}

export const config = {
   matcher: ['/'],
};
