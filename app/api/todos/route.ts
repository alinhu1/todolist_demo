import { prisma } from "@/lib/prisma";


export async function GET() {
    const result = await prisma.todos.findMany()

    return Response.json(result)

}



