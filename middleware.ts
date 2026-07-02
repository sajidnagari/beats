import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "pulsetok_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
