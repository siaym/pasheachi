"use server";

import { prisma } from "@/lib/prisma";
import { loginSession, logoutSession, encrypt, decrypt } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { sendVerificationEmail } from "@/lib/email";
import { storeVerificationCode, verifyCode } from "@/lib/verification-store";

export async function loginAction(formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    return { error: "Username and password are required" };
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier.toLowerCase() },
        { email: identifier.toLowerCase() }
      ]
    }
  });

  if (!user || !user.password) {
    return { error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  await loginSession(user.id);
  
  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !username || !email || !password) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    }
  });

  if (existingUser) {
    return { error: "Username or email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    }
  });

  // Generate 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  if (user.email) {
    storeVerificationCode(user.email, user.id, code);

    // Save encrypted token in cookie so verification survives serverless restarts/different lambdas
    try {
      const verifyToken = await encrypt({
        userId: user.id,
        email: user.email.toLowerCase().trim(),
        code,
        expiresAt: Date.now() + 15 * 60 * 1000,
      });
      const cookieStore = await cookies();
      cookieStore.set("pasheachi_verify_token", verifyToken, {
        httpOnly: true,
        maxAge: 15 * 60,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
    } catch (tokenErr) {
      console.error("Failed to set verification cookie:", tokenErr);
    }

    // Send email via Resend
    sendVerificationEmail(user.email, user.name, code).catch((err) => {
      console.error("Async email error:", err);
    });
  }

  // Redirect to verify-email page instead of direct login
  redirect(`/verify-email?email=${encodeURIComponent(user.email || "")}`);
}

export async function verifyEmailAction(formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  if (!email || !code) {
    return { error: "Email and verification code are required." };
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();

  // 1. Try memory verification first
  let result = verifyCode(cleanEmail, cleanCode);

  // 2. Fallback to encrypted cookie verification (essential for multi-container/serverless environments like Vercel)
  if (!result.success) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("pasheachi_verify_token")?.value;
      if (token) {
        const payload = await decrypt(token);
        if (
          payload?.email?.toLowerCase().trim() === cleanEmail &&
          String(payload?.code).trim() === cleanCode &&
          Date.now() < (payload?.expiresAt || 0)
        ) {
          result = { success: true, userId: payload.userId };
          cookieStore.delete("pasheachi_verify_token");
        }
      }
    } catch (e) {
      console.error("Cookie verification fallback error:", e);
    }
  }

  if (!result.success || !result.userId) {
    return { error: result.error || "Invalid or expired verification code. Please request a new code below." };
  }

  await loginSession(result.userId);

  redirect("/dashboard");
}

export async function resendVerificationCodeAction(email: string) {
  if (!email) {
    return { error: "Email address is required." };
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await prisma.user.findFirst({
    where: { email: cleanEmail }
  });

  if (!user || !user.email) {
    return { error: "No account found matching this email address." };
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  storeVerificationCode(user.email, user.id, code);

  try {
    const verifyToken = await encrypt({
      userId: user.id,
      email: user.email.toLowerCase().trim(),
      code,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
    const cookieStore = await cookies();
    cookieStore.set("pasheachi_verify_token", verifyToken, {
      httpOnly: true,
      maxAge: 15 * 60,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (err) {
    console.error("Failed to update verification cookie:", err);
  }

  const sendResult = await sendVerificationEmail(user.email, user.name, code);
  if (!sendResult.success) {
    return { error: sendResult.error || "Failed to dispatch verification email. Please try again shortly." };
  }

  return { success: true, message: `New authorization code dispatched to ${user.email}.` };
}

export async function logoutAction() {
  await logoutSession();
  redirect("/login");
}
