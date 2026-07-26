import { PrismaClient } from '@prisma/client';
import { MOCK_USERS, MOCK_CAMPAIGNS, MOCK_TRANSACTIONS } from '../src/data/mock';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.user.deleteMany();

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
      },
    });
    console.log(`Created user with id: ${user.id}`);
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
