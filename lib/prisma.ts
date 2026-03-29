import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // Si tu es sur Postgres

// Adapter direct TCP pour Prisma v7
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

// Instanciation
const prisma = new PrismaClient({ adapter });

export { prisma };