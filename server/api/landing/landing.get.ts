import { PrismaClient } from "@prisma/client" 
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    // ... Do whatever you want here

   return await prisma.landing.findMany({
        select: {
            id: true,
            name: true,
            title: true,
            desc: true
        }
   })
  })