import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/auth";
import { AUTH_TOKEN_KEY } from "./constants";

export { default } from "next-auth/middleware";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value ?? "";

  const isUserAuthenticated = isAuthenticated(token);
  const { pathname } = request.nextUrl;

  if (
    isUserAuthenticated &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!isUserAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const protectedRoutes = ["/routeOne", "/routeTwo"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isUserAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|static).*)"],
};
