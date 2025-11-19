import prisma from '../src/utils/db';

const USD_TO_BRL = 5.5;

async function main() {
  console.log("📌 Recalculating BRL prices based on USD...");

  const domains = await prisma.domain.findMany();

  for (const domain of domains) {
    if (!domain.price_usd) continue;

    const newBRL = Math.round(Number(domain.price_usd) * USD_TO_BRL * 100) / 100;

    await prisma.domain.update({
      where: { id: domain.id },
      data: { price_brl: newBRL }
    });

    console.log(`Updated ${domain.domain_name} → R$ ${newBRL}`);
  }

  console.log("✅ Done! All BRL prices updated.");
  process.exit();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

