import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { username: 'siyam' },
    data: {
      location: 'Sylhet, Bangladesh',
      bio: `I am a passionate community organizer based in Sylhet. 

Over the last 5 years, I have been actively involved in local flood relief efforts and helping underprivileged students access proper education. 

My goal on PasheAchi is to bring transparent, direct support to those who need it most in our local communities. Thank you to everyone who has stood beside us!`,
      email: 'siyam@example.com',
      coverUrl: 'https://images.unsplash.com/photo-1596706972276-857c0e6fc8da?q=80&w=2000&auto=format&fit=crop',
    }
  });
  console.log('User profile seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
