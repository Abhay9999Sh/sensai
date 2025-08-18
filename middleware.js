import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",

])

export default clerkMiddleware(async (auth, req) => {
  const {userId} = await auth();
  if(!userId && isProtectedRoute(req)) {
    const {redirectToSignIn} = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
})

//when we go to any of protectedroute , if usernot logged in then redirect to signin page
//but we are being redireced to third party url signin page, which we dont want , so we are going to embed
//it with our url

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}





let arr = [1, 2, 3, ];

arr.map((item) =>item*2 );
arr.filter((item) => item % 2 == 0);