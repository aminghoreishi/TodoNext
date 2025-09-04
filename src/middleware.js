import { NextResponse } from "next/server";

export function middleware(request) {
  const tokenValue = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  if (tokenValue && (pathname === "/login" || pathname === "/reg")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!tokenValue && pathname === "/") {
    console.log("Redirecting to login (not logged in)");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/reg", "/"],
};
