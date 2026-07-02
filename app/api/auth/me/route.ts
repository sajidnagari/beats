import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  return withApiRoute(async () => {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401, "UNAUTHORIZED");

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, plan: true },
    });

    if (!user) return jsonError("Unauthorized", 401, "UNAUTHORIZED");
    return jsonOk({ user });
  });
}
