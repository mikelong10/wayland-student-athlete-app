import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@lib/auth"
import { db } from "@lib/db"

const postCreateSchema = z.object({
  adultFirstName: z.string(),
  adultLastName: z.string(),
  childFirstName: z.string().optional(),
  childLastName: z.string().optional(),
  description: z.string(),
  location: z.string(),
  time: z.string(),
  contact: z.string(),
  frequency: z.string(),
  learn: z.string(),
  special: z.string(),
  signature: z.string()
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const jobs = await db.job.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(jobs))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session) {
//       return new Response("Unauthorized", { status: 403 })
//     }

//     const { user } = session
//     const subscriptionPlan = await getUserSubscriptionPlan(user.id)

//     // If user is on a free plan.
//     // Check if user has reached limit of 3 posts.
//     if (!subscriptionPlan?.isPro) {
//       const count = await db.post.count({
//         where: {
//           authorId: user.id,
//         },
//       })

//       if (count >= 3) {
//         throw new RequiresProPlanError()
//       }
//     }

//     const json = await req.json()
//     const body = postCreateSchema.parse(json)

//     const post = await db.post.create({
//       data: {
//         title: body.title,
//         content: body.content,
//         authorId: session.user.id,
//       },
//       select: {
//         id: true,
//       },
//     })

//     return new Response(JSON.stringify(post))
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 })
//     }

//     if (error instanceof RequiresProPlanError) {
//       return new Response("Requires Pro Plan", { status: 402 })
//     }

//     return new Response(null, { status: 500 })
//   }
// }
