import { jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks = {
    database: "missing" as "connected" | "missing" | "error",
    auth: "missing" as "configured" | "missing",
    databaseUrl: Boolean(process.env.DATABASE_URL),
    authSecret: Boolean(process.env.AUTH_SECRET),
  };

  if (process.env.AUTH_SECRET) {
    checks.auth = "configured";
  }

  if (process.env.DATABASE_URL) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = "connected";
    } catch {
      checks.database = "error";
    }
  }

  const healthy = checks.database === "connected" && checks.auth === "configured";

  return jsonOk({
    status: healthy ? "ok" : "degraded",
    checks,
    timestamp: new Date().toISOString(),
    hint:
      checks.auth === "missing"
        ? "Add AUTH_SECRET in Vercel → Settings → Environment Variables, then Redeploy."
        : checks.database !== "connected"
          ? "Check DATABASE_URL in Vercel environment variables."
          : null,
  });
}
