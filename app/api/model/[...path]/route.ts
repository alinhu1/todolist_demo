import { logtoConfig } from "@/app/logto";
import { prisma } from "@/lib/prisma";
import { getLogtoContext } from "@logto/next/server-actions";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";

async function getPrisma() {
    const { claims } = await getLogtoContext(logtoConfig);
    const user = claims?.sub ? { id: claims?.sub } : undefined;
    return enhance(prisma,{user})
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