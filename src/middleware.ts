import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from './utility/constant';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check nếu URL bắt đầu bằng một trong các protected routes
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected) {
    if (!request.cookies.has('accessToken')) {
      return NextResponse.redirect(new URL('/dat-san', request.url));
    }
  }

  NextResponse.next();
}

// khi có request đến các path được chỉ định thì middleware kiểm tra
// cookies có accessToken không, nếu không thì chặn truy cập vào path
// sau đó redirect về url được truyền vào trong NextResponse.redirect
export const config = {
  matcher: ['/:path*'], // Bắt TẤT CẢ request
};
