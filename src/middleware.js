import { NextResponse } from "next/server";

export function middleware(request) {
  const tokenValue = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("Path:", pathname, "Token:", tokenValue);

  // کاربر لاگین کرده اما می‌خواهد به صفحات auth برود
  if (tokenValue && (pathname === "/login" || pathname === "/reg")) {
    console.log("Redirecting to home (already logged in)");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // کاربر لاگین نکرده اما می‌خواهد به صفحه اصلی برود
  if (!tokenValue && pathname === "/") {
    console.log("Redirecting to login (not logged in)");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/reg"],
};