import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface Irole {
  permission: string[];
}

interface Idecode {
  exp: number;
  role: Irole;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decode = jwtDecode(`${token}`) as Idecode;
  const now = Date.now() / 3000;
  if (now > decode.exp) {
    request.cookies.delete("_token");
    return NextResponse.redirect(new URL("/user", request.url));
  }

  const permission = decode.role.permission.includes(request.url.split("/")[4]);
  if (!permission) {
    return NextResponse.redirect(new URL("/user", request.url));
  }
}

export const config = {
  matcher: [
    "/user/participant/:path*",
    "/user/transaction/:path*",
    "/user/school/:path*",
    "/user/region/:path*",
    "/user/admin/:path*",
  ],
};
