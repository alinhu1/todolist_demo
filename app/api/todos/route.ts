import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

export async function GET() {
    const prisma = new PrismaClient();
    const enhancePrisma = enhance(prisma)

    const result = await enhancePrisma.todos.findMany() 

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

