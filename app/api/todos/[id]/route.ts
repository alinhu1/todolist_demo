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