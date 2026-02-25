import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPaths = ["/dashboard", "/transacoes", "/configuracoes"];

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/webhook/sms")) {
    return NextResponse.next();
  }

  // Development fallback: allow app navigation without auth until Supabase is configured.
  if (!hasSupabaseEnv) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);

  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
