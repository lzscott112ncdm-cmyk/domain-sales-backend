import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 Set your exchange rate here
const USD_TO_BRL = 5.5;

async function recalcPrices() {
  console.log("🔄 Recalculating BRL prices based on USD...");

  // Get all domains
  const domains = await prisma.domain.findMany();

  for (const domain of domains) {
    if (!domain.priceUSD) continue; // skip if missing price

    const newBRL = Math.round(domain.priceUSD * USD_TO_BRL);

    await prisma.domain.update({
      where: { id: domain.id },
      data: { priceBRL: newBRL }
    });

    console.log(
      `✔ Updated: ${domain.name} | USD: $${domain.priceUSD} → BRL: R$${newBRL}`
    );
  }

  console.log("✅ All BRL prices recalculated!");
}

recalcPrices()
  .catch((err) => {
    console.error("❌ Error recalculating prices:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database disconnected.");
  });
