import { jsonError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

async function requireUserId() {
  const session = await getSession();
  if (!session) return null;
  return session.userId;
}

export async function GET() {
  try {
    const userId = await requireUserId();
    if (!userId) return jsonError("Unauthorized", 401);

    const [metrics, videos, dailyViews] = await Promise.all([
      prisma.dashboardMetric.findMany({ where: { userId }, orderBy: { order: "asc" } }),
      prisma.video.findMany({ where: { userId }, orderBy: { order: "asc" } }),
      prisma.dailyViewStat.findMany({ where: { userId }, orderBy: { day: "asc" }, take: 7 }),
    ]);

    return jsonOk({
      metrics,
      videos,
      weeklyViews: dailyViews.map((d) => d.value),
      growthScore: 86,
    });
  } catch {
    return jsonError("Failed to load overview", 500);
  }
}
