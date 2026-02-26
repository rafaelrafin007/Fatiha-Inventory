import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const adminOnlyPaths = ["/dashboard/users"];

export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_AUTH_GUARD !== "on") {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name, options) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  if (!isDashboard) return response;

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const needsAdmin = adminOnlyPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (needsAdmin) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!data || data.role !== "admin") {
      const homeUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
