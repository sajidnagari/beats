import { jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { getDatabaseUrl, getAuthSecret } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return withApiRoute(async () => {
    getDatabaseUrl();
    getAuthSecret();
    await prisma.$queryRaw`SELECT 1`;

    return jsonOk({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  });
}
