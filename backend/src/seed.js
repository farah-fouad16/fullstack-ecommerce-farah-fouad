const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('AdminPassword123!', 10);
  const customerPassword = await bcrypt.hash('CustomerPassword123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Farah Admin', password: adminPassword, role: 'ADMIN' }
  });

  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: { email: 'customer@example.com', name: 'Farah Customer', password: customerPassword, role: 'CUSTOMER' }
  });

  const techCategory = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics' }
  });

  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Wireless Headphones', description: 'Noise cancelling over-ear headphones', price: 99.99, categoryId: techCategory.id },
      { name: 'Smart Watch', description: 'Fitness tracker with heart monitor', price: 149.99, categoryId: techCategory.id }
    ]
  });

  console.log('Seed data successfully created!');
}

main().finally(async () => await prisma.$disconnect());