import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  return withApiRoute(async () => {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401, "UNAUTHORIZED");

    const [formats, videos] = await Promise.all([
      prisma.contentFormat.findMany({
        where: { userId: session.userId },
        orderBy: { order: "asc" },
      }),
      prisma.video.findMany({
        where: { userId: session.userId },
        orderBy: { order: "asc" },
      }),
    ]);

    return jsonOk({ formats, videos });
  });
}
