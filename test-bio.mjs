import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({ where: { username: 'siyam' }});
  console.log("BIO:", user.bio);
}
main().finally(() => prisma.$disconnect());
