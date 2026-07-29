import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { User } from "@/types";

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("CRITICAL SECURITY FATAL: JWT_SECRET environment variable is missing in production mode!");
}

const secretKey = process.env.JWT_SECRET || "default_secret_for_development_only_12345";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function loginSession(userId: string) {
  // Create the session
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, expires });

  // Save the session in a cookie
  const cookieStore = await cookies();
  cookieStore.set("session", session, { 
    expires, 
    httpOnly: true, 
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production" 
  });
}

export async function logoutSession() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { 
    expires: new Date(0), 
    httpOnly: true, 
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production" 
  });
}


export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session || !session.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
  });

  if (!user) return null;

  // Security check: Immediately revoke session if user is banned or suspended
  if (user.status === "banned" || user.status === "suspended") {
    if (user.banExpiresAt && user.banExpiresAt < new Date()) {
      // Auto-reactivate expired temporary suspension
      await prisma.user.update({
        where: { id: user.id },
        data: { status: "active", banReason: null, banExpiresAt: null }
      });
      return user as any;
    } else {
      // User is actively banned - clear session cookie & deny access
      try {
        await logoutSession();
      } catch (e) {
        // Safe fallback in static context
      }
      return null;
    }
  }

  return user as any;
}
