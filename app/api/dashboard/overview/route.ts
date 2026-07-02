import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  return withApiRoute(async () => {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401, "UNAUTHORIZED");

    const [metrics, videos, dailyViews] = await Promise.all([
      prisma.dashboardMetric.findMany({ where: { userId: session.userId }, orderBy: { order: "asc" } }),
      prisma.video.findMany({ where: { userId: session.userId }, orderBy: { order: "asc" } }),
      prisma.dailyViewStat.findMany({ where: { userId: session.userId }, orderBy: { day: "asc" }, take: 7 }),
    ]);

    return jsonOk({
      metrics,
      videos,
      weeklyViews: dailyViews.map((d) => d.value),
      growthScore: 86,
    });
  });
}
