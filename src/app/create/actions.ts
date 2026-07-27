"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  let slug = baseSlug || "campaign";
  let count = 1;

  while (await prisma.campaign.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

function isValidBdMobile(phone: string): boolean {
  const clean = phone.replace(/[\s-]/g, "");
  return /^01[3-9]\d{8}$/.test(clean);
}

export async function createCampaignAction(formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    return { success: false, error: "You must be logged in to create a campaign." };
  }

  try {
    const title = (formData.get("title") as string || "").trim();
    const subtitle = (formData.get("subtitle") as string || "").trim();
    const category = (formData.get("category") as string || "").trim();
    const campaignType = (formData.get("campaignType") as string || "flexible").trim();
    const story = (formData.get("story") as string || "").trim();
    const customCoverUrl = (formData.get("coverImageUrl") as string || "").trim();
    
    // Validation
    if (title.length < 5) {
      return { success: false, error: "Campaign title must be at least 5 characters long." };
    }

    if (story.length < 20) {
      return { success: false, error: "Story description must be at least 20 characters long." };
    }

    // Numbers and calculation
    const goalAmountRaw = formData.get("goalAmount") as string;
    const fixedAmountRaw = formData.get("fixedAmount") as string;
    const targetParticipantsRaw = formData.get("targetParticipants") as string;
    
    let goalAmount = 0;
    let fixedAmount: number | null = null;
    let targetParticipants: number | null = null;

    if (campaignType === "fixed") {
      fixedAmount = parseFloat(fixedAmountRaw) || 0;
      targetParticipants = parseInt(targetParticipantsRaw) || 0;
      if (fixedAmount <= 0 || targetParticipants <= 0) {
        return { success: false, error: "Fixed contribution amount and target participants must be greater than zero." };
      }
      goalAmount = fixedAmount * targetParticipants;
    } else {
      goalAmount = parseFloat(goalAmountRaw) || 0;
      if (goalAmount <= 0) {
        return { success: false, error: "Funding goal amount must be greater than 0 BDT." };
      }
    }

    // Payment Info
    const bkashNumber = (formData.get("bkashNumber") as string || "").trim();
    const nagadNumber = (formData.get("nagadNumber") as string || "").trim();
    const bankDetails = (formData.get("bankDetails") as string || "").trim();

    if (!bkashNumber && !nagadNumber && !bankDetails) {
      return { success: false, error: "You must provide at least one payment receiving method (bKash, Nagad, or Bank)." };
    }

    if (bkashNumber && !isValidBdMobile(bkashNumber)) {
      return { success: false, error: "Please enter a valid 11-digit Bangladeshi bKash number (e.g. 01700000000)." };
    }

    if (nagadNumber && !isValidBdMobile(nagadNumber)) {
      return { success: false, error: "Please enter a valid 11-digit Bangladeshi Nagad number (e.g. 01800000000)." };
    }

    // Cover Image URL
    const coverImageUrl = customCoverUrl || "https://images.unsplash.com/photo-1593113565694-c6aa1b50ba0b?q=80&w=2000&auto=format&fit=crop";

    const slug = await generateUniqueSlug(title);

    const campaign = await prisma.campaign.create({
      data: {
        slug,
        title,
        subtitle: subtitle || title,
        category,
        location: user.location || "Dhaka, Bangladesh",
        description: story,
        coverImageUrl,
        goalAmount,
        campaignType,
        fixedAmount,
        targetParticipants,
        bkashNumber: bkashNumber || null,
        nagadNumber: nagadNumber || null,
        bankDetails: bankDetails || null,
        creatorId: user.id,
        status: "active",
      }
    });

    revalidatePath("/discover");
    revalidatePath("/dashboard");
    revalidatePath(`/${user.username}`);

    return { 
      success: true, 
      campaignId: campaign.id,
      slug: campaign.slug,
      creatorUsername: user.username,
      redirectUrl: `/${user.username}/${campaign.slug}`
    };

  } catch (error: any) {
    console.error("Failed to create campaign:", error);
    return { success: false, error: error.message || "Failed to create campaign." };
  }
}

