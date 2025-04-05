import { prisma } from "@/lib/prisma";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";


async function getPrisma() {
    return enhance(prisma)
}

const handler =NextRequestHandler({
    getPrisma,
    useAppDir:true,
})
export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as DELETE,
}