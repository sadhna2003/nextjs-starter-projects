import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that do NOT require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Check if current path is a public route
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  // If user is NOT authenticated and trying to access a protected route → redirect to /login
  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // If user IS authenticated and trying to access a public route → redirect to /dashboard
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes EXCEPT static assets, api routes, and Next.js internals
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder assets (img, icons, etc.)
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|img|icons|logo|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
