import { Prisma, PrismaClient } from "@prisma/client";

//使用初始数据作为数据库的设定种子
const prisma = new PrismaClient()

const todoData: Prisma.TodosCreateInput[] = [
    {
        name: '吃饭',
        completed: true
    },
    {
        name: '睡觉',
        completed: true
    },
    {
        name: '打豆豆',
        completed: true
    }
]
export async function main() {
    for (const t of todoData) {
        await prisma.todos.create({ data: t })
    }
}

main()