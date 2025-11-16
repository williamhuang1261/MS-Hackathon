import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Apply internationalization middleware
  const response = intlMiddleware(request);
  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals
  // - static assets (any path containing a file extension)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
