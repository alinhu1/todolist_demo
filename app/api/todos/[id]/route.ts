import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id)

    const deletetodos = await prisma.todos.delete({
        where: { id }
    })
    return NextResponse.json(deletetodos)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id)

    const { completed } = await request.json()

    const updateTodo = await prisma.todos.update({
        where: { id },
        data: { completed }
    })

    return NextResponse.json(updateTodo)
}