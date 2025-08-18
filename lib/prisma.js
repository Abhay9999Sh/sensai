import { PrismaClient } from "./generated/prisma"

export const db = new PrismaClient();


if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

//after signin with clerk , i can see the user details in my  neon db