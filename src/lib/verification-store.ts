interface VerificationEntry {
  userId: string;
  code: string;
  expiresAt: number;
}

const VERIFICATION_MAP = new Map<string, VerificationEntry>();

export function storeVerificationCode(email: string, userId: string, code: string) {
  const normalizedEmail = email.toLowerCase().trim();
  VERIFICATION_MAP.set(normalizedEmail, {
    userId,
    code,
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes validity
  });
}

export function verifyCode(email: string, inputCode: string): { success: boolean; userId?: string; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = VERIFICATION_MAP.get(normalizedEmail);

  if (!entry) {
    return { success: false, error: "Verification code expired or not found. Please request a new code." };
  }

  if (Date.now() > entry.expiresAt) {
    VERIFICATION_MAP.delete(normalizedEmail);
    return { success: false, error: "Verification code has expired. Please sign up again." };
  }

  if (entry.code !== inputCode.trim()) {
    return { success: false, error: "Invalid verification code. Please check your email inbox." };
  }

  VERIFICATION_MAP.delete(normalizedEmail);
  return { success: true, userId: entry.userId };
}
