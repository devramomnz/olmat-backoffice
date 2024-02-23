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

  console.log(decode.role.permission);
  const permission = decode.role.permission.includes(request.url.split("/")[4]);
  // const permissionEdit = decode.role.permission.includes(
  //   request.url.split("/")[5]
  // );
  if (!permission) {
    return NextResponse.redirect(new URL("/user", request.url));
  }
}

export const config = {
  matcher: [
    "/user/participant/",
    "/user/transaction/:path*",
    "/user/school",
    "/user/school/waiting/:path*",
    "/user/school/school.edit/:path*",
    "/user/region/",
    "/user/admin/:path*",
  ],
};
