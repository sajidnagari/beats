import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  return withApiRoute(async () => {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401, "UNAUTHORIZED");

    const segments = await prisma.audienceSegment.findMany({
      where: { userId: session.userId },
      orderBy: { order: "asc" },
    });

    return jsonOk({
      segments,
      insights: [
        "Peak activity: 7 PM - 10 PM",
        "Top region: United States (42%)",
        "Returning viewers: 61%",
        "Follower conversion rate: 3.8%",
      ],
    });
  });
}
