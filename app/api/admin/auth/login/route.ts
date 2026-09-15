import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  createAdminToken,
  validateAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Inserisci username e password." },
        { status: 400 }
      );
    }

    const { isValid, username: validatedUser } = await validateAdminCredentials(
      username,
      password
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Credenziali non valide. Riprova." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(validatedUser);
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json({
      success: true,
      message: "Autenticazione riuscita.",
      user: validatedUser,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: SESSION_DURATION_SECONDS,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Si è verificato un errore del server durante il login." },
      { status: 500 }
    );
  }
}
