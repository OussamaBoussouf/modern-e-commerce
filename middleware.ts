import { clerkMiddleware, ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

async function authMiddleware(request: NextRequest, auth: ClerkMiddlewareAuth) {
  // const { userId } = await auth();
  // const cookieStore = request.cookies;
  // const sessionCookie = cookieStore.get("visitorId")?.value;
  const res = NextResponse.next({ request });

  //MANAGE THE USER SESSION BASED ON HIS STATUS "VISTOR OR USER"
  // if (userId && sessionCookie) {
  //   await fetch(`${request.nextUrl.origin}/api/check-user`, {
  //     method: "POST",
  //     body: JSON.stringify({ userId, visitorId: sessionCookie }),
  //   });
  //   res.cookies.delete("visitorId");
  // }

  // if (!userId && !sessionCookie) {
  //   const visitorId = uuidv4();
  //   res.cookies.set("visitorId", visitorId, {
  //     maxAge: 60 * 60 * 24 * 10,
  //   });
  // }

  return res;
}

export default clerkMiddleware(async (auth, req) => {
  return authMiddleware(req, auth);
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
