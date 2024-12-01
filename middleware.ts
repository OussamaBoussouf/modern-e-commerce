import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

async function authMiddleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const sessionCookie = cookieStore.get("visitorId")?.value;
 
  const res = NextResponse.next({ request });

  if (!sessionCookie) {
    const visitorId = uuidv4();
    res.cookies.set("visitorId", visitorId, {
      maxAge: 60 * 60 * 24 * 10,
    });
  }

  return res;
}

export default clerkMiddleware(async (auth, req) => {
  
    return authMiddleware(req);
  
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/((?!api|_next/static|_next/image|.favicon.ico).*)",
  ],
};
