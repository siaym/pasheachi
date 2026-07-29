import { PrismaClient } from '@prisma/client';
import { MOCK_USERS, MOCK_CAMPAIGNS, MOCK_TRANSACTIONS } from '../src/data/mock';

const prisma = new PrismaClient();

async function main() {
  console.log('Start non-destructive seeding...');

  // Safe seeding without deleteMany to preserve user-created accounts & campaigns

  // Create Users
  for (const key of Object.keys(MOCK_USERS)) {
    const mockUser = MOCK_USERS[key as keyof typeof MOCK_USERS];
    const user = await prisma.user.upsert({
      where: { username: mockUser.username },
      update: {},
      create: {
        id: mockUser.id,
        username: mockUser.username,
        name: mockUser.name,
        avatarUrl: mockUser.avatarUrl,
        role: mockUser.role,
        lastLoginIp: "103.114.172.45",
        lastLoginAt: new Date(),
      },
    });
    console.log(`Created user with id: ${user.id}`);

    // Seed KYC documents for creator safely if not present
    const existingDoc = await prisma.verificationDocument.findFirst({
      where: { creatorId: user.id, documentType: "National ID (Front)" }
    });

    if (!existingDoc) {
      await prisma.verificationDocument.create({
        data: {
          documentType: "National ID (Front)",
          storageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          mimeType: "image/png",
          size: 345000,
          status: "verified",
          remarks: "NID Front authenticated via Bangladesh Election Commission API stub",
          creatorId: user.id,
        }
      });

      await prisma.verificationDocument.create({
        data: {
          documentType: "Biometric Selfie with NID",
          storageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          mimeType: "image/jpeg",
          size: 512000,
          status: "verified",
          remarks: "Face match confidence score 99.4%",
          creatorId: user.id,
        }
      });
    }
  }

  // Create Campaigns
  for (const mockCampaign of MOCK_CAMPAIGNS) {
    const campaign = await prisma.campaign.upsert({
      where: { id: mockCampaign.id },
      update: {},
      create: {
        id: mockCampaign.id,
        slug: mockCampaign.slug,
        title: mockCampaign.title,
        subtitle: (mockCampaign as any).subtitle || "",
        category: mockCampaign.category,
        location: (mockCampaign as any).location || "Dhaka, Bangladesh",
        description: mockCampaign.description,
        coverImageUrl: mockCampaign.coverImageUrl,
        goalAmount: mockCampaign.goalAmount,
        raisedAmount: mockCampaign.raisedAmount,
        campaignType: mockCampaign.campaignType || "flexible",
        fixedAmount: mockCampaign.fixedAmount,
        isFeatured: mockCampaign.isFeatured || false,
        isPinned: mockCampaign.isPinned || false,
        status: mockCampaign.status,
        bkashNumber: (mockCampaign as any).paymentDetails?.bkash,
        nagadNumber: (mockCampaign as any).paymentDetails?.nagad,
        bankDetails: (mockCampaign as any).paymentDetails?.bank,
        creatorId: mockCampaign.creator.id,
        createdAt: new Date(mockCampaign.createdAt),
      },
    });
    console.log(`Created campaign with id: ${campaign.id}`);

    // Create verification documents for this campaign safely if not present
    const existingCmpDoc = await prisma.verificationDocument.findFirst({
      where: { campaignId: campaign.id }
    });

    if (!existingCmpDoc) {
      await prisma.verificationDocument.create({
        data: {
          documentType: "National ID (Front)",
          storageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          mimeType: "image/png",
          size: 345000,
          status: "verified",
          remarks: "Creator NID verified against Election Commission database",
          campaignId: campaign.id,
          creatorId: mockCampaign.creator.id,
        }
      });

      await prisma.verificationDocument.create({
        data: {
          documentType: "Medical Certificate / Clinical Summary",
          storageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
          mimeType: "application/pdf",
          size: 1240000,
          status: "verified",
          remarks: "Signed by Senior Consultant Cardiologist",
          campaignId: campaign.id,
          creatorId: mockCampaign.creator.id,
        }
      });

      await prisma.verificationDocument.create({
        data: {
          documentType: "Hospital Cost Estimate & Quotation",
          storageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
          mimeType: "application/pdf",
          size: 890000,
          status: "verified",
          remarks: "Hospital billing department verified quotation",
          campaignId: campaign.id,
          creatorId: mockCampaign.creator.id,
        }
      });
    }

    // Create Milestones for this campaign
    if (mockCampaign.milestones) {
      for (const m of mockCampaign.milestones) {
        await prisma.milestone.create({
          data: {
            id: m.id,
            title: m.title,
            amount: m.amount,
            completed: m.completed,
            campaignId: campaign.id,
          }
        });
      }
    }
  }

  // Create Transactions
  for (const trx of MOCK_TRANSACTIONS) {
    await prisma.transaction.create({
      data: {
        id: trx.id,
        donorName: trx.donorName,
        phone: trx.phone,
        amount: trx.amount,
        method: trx.method,
        status: trx.status,
        campaignId: "cmp-1", // hardcoded to first campaign for mock data
      }
    });
  }

  // Create Mock Messages and Notifications
  await prisma.message.create({
    data: {
      senderName: "Arif Ahmed",
      email: "arif@example.com",
      content: "Assalamu Alaikum. I just donated 5,000 BDT via bKash. Hope it helps!",
      isRead: false,
      recipientId: "usr-1",
    }
  });

  await prisma.message.create({
    data: {
      senderName: "Fatema Tuz",
      email: "fatema@example.com",
      content: "Is there any other way I can help?",
      isRead: true,
      recipientId: "usr-1",
    }
  });

  await prisma.notification.create({
    data: {
      type: "donation",
      message: "Arif Ahmed donated ৳5,000 to Laptop Fund.",
      isRead: false,
      userId: "usr-1",
    }
  });

  await prisma.notification.create({
    data: {
      type: "verification",
      message: "Your medical documents have been verified by the PasheAchi team.",
      isRead: true,
      userId: "usr-1",
    }
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
