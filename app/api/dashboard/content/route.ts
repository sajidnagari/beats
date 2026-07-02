import { jsonError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

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
  } catch {
    return jsonError("Failed to load content", 500);
  }
}
