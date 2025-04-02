import { prisma } from "@/lib/prisma";

export async function GET() {
    const result = await prisma.todos.findMany()

    return Response.json(result)

}

export async function POST(request: Request) {

    const { name, completed = false } = await request.json()

    const newTodo = await prisma.todos.create({
        data: {
            name,
            completed
        }
    })

    return Response.json(newTodo)
}

