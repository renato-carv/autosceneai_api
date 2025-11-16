import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@autoscaleai.com" },
    update: {},
    create: {
      email: "admin@autoscaleai.com",
      password: passwordHash,
    },
  });

  console.log("✔ Usuário criado:", user.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seed finalizada.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
