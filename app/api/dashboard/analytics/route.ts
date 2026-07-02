import { jsonError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const [metrics, dailyViews] = await Promise.all([
      prisma.dashboardMetric.findMany({
        where: { userId: session.userId },
        orderBy: { order: "asc" },
      }),
      prisma.dailyViewStat.findMany({
        where: { userId: session.userId },
        orderBy: { day: "asc" },
        take: 7,
      }),
    ]);

    return jsonOk({
      metrics,
      viewsTrend: dailyViews.map((d) => d.value),
      engagementTrend: dailyViews.map((d) => Math.max(20, Math.round(d.value * 0.75))),
      extras: [
        { label: "Profile visits", value: "18.4K" },
        { label: "Shares", value: "6.2K" },
        { label: "Comments", value: "4.9K" },
      ],
    });
  } catch {
    return jsonError("Failed to load analytics", 500);
  }
}
