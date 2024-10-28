import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const body = await readBody(event)
  let lead = null

//   Types
//   name: string,
//   email: string,
//   landingId: number,
//   status: string

  if (body.landingId)
    await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        landingId: body.landingId,
        status: body.status
      },
    }).then((response) => {
      lead = response
    })

  return {
    lead: lead
  }
})