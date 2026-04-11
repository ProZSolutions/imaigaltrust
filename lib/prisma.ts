import { PrismaClient } from "@prisma/client"

// Global BigInt serialization fix
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export { prisma };
export default prisma;
