//import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();

  if (
    request.cookies.get("token") != null &&
    request.cookies.get("token") != undefined &&
    request.cookies.get("token")?.value.length != 0
  ) {
   /* const clientToken = request.cookies.get("token");

    const req = await fetch(
      `http://${request.nextUrl.host}/api/token/${clientToken?.value}`,
      { method: "GET" },
    );
    const res = await req.json();
    if (res.message === "!exist") {
      console.log("existe");
    }else {
        return res;
    } */
  } else {
    const req = await fetch(`${request.nextUrl.origin}/api/token`, {
      body: JSON.stringify({
        ip: request.ip,
        method: request.method,
        url: request.nextUrl,
        geo: {
          country: request.geo?.country,
          city: request.geo?.city,
        },
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await req.json();

    if (response.token != undefined) {
      res.cookies.set("token", response.token, {
        path: "/",
        httpOnly: true, // No accesible desde JavaScript del lado del cliente
        maxAge: 3600, // Duración de la cookie en segundos
        sameSite: "strict", // Protección contra CSRF
      });
    }
  }

  return res;
}
