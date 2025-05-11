import { getLogtoContext, handleSignIn } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { logtoConfig } from "../logto";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleSignIn(logtoConfig, searchParams);
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  console.log("Auth User ID:", claims?.sub);

  if (claims?.sub && isAuthenticated) {
    try {
      const name = claims.name || "Unnamed User";

      const result = await prisma.$transaction(async (tx) => {
        return tx.user.upsert({
          where: { id: claims.sub },
          create: { id: claims.sub, name },
          update: { name },
        });
      });

      console.log("[Callback] 用户同步成功:", result);
    } catch (error) {
      console.error("[Callback] 用户同步失败:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  redirect("/auth/personal");
}
