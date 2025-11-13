
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.domain.deleteMany({});
  console.log('📝 Cleared existing domains');

  // Create example domains
  const domains = await prisma.domain.createMany({
    data: [
      {
        domain_name: 'techstartup.com',
        price_usd: 5000,
        price_brl: 27500,
        whatsapp_number: '+5521999998888',
        afternic_url: 'https://www.afternic.com/domain/techstartup.com',
        active: true,
      },
      {
        domain_name: 'airevolution.com',
        price_usd: 12500,
        price_brl: 68750,
        whatsapp_number: '+5521999998888',
        afternic_url: 'https://www.afternic.com/domain/airevolution.com',
        active: true,
      },
      {
        domain_name: 'cryptotrader.com',
        price_usd: 8750,
        price_brl: 48125,
        whatsapp_number: '+5521999998888',
        afternic_url: 'https://www.afternic.com/domain/cryptotrader.com',
        active: true,
      },
    ],
  });

  console.log(`✅ Created ${domains.count} example domains`);
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
