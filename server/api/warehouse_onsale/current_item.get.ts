import { PrismaClient } from "@prisma/client" 
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    // ... Do whatever you want here

    let result = await prisma.warehouse.findUnique({
        where: {
            id: 1
        }
    })
    return result
  })