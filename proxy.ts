import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// CHANGE: Changed function name from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and public API routes to pass through
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/blogs")
  ) {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }

    // Token valid — attach user info to header for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", payload.id);
    requestHeaders.set("x-admin-email", payload.email);

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

// proxy.ts

// ... keep your export function proxy(request: NextRequest) { ... } exactly as it is

export const config = {
  // This matches all /admin paths EXCEPT /admin/login
  matcher: [
    "/((?!admin/login)admin/:path*)",
    "/api/admin/:path*"
  ],
};