"use server";

import { prisma } from "@/lib/prisma";
import { loginSession, logoutSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
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

  const result = verifyCode(email, code);

  if (!result.success || !result.userId) {
    return { error: result.error || "Verification failed." };
  }

  await loginSession(result.userId);

  redirect("/dashboard");
}

export async function logoutAction() {
  await logoutSession();
  redirect("/login");
}
