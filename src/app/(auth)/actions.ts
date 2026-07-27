"use server";

import { prisma } from "@/lib/prisma";
import { loginSession, logoutSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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

import { sendVerificationEmail } from "@/lib/email";

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

  // Trigger verification email via Resend in background without blocking response
  if (user.email) {
    sendVerificationEmail(user.email, user.name).catch((err) => {
      console.error("Async email error:", err);
    });
  }

  await loginSession(user.id);
  
  redirect("/dashboard");
}


export async function logoutAction() {
  await logoutSession();
  redirect("/login");
}

