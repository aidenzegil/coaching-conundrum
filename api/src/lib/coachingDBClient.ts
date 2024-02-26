import { PrismaClient } from "@prisma/client";

export const coachingDBClient = new PrismaClient();

// Middleware is not active in the test environment
