import { jsonError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, plan: true },
    });

    if (!user) return jsonError("Unauthorized", 401);
    return jsonOk({ user });
  } catch {
    return jsonError("Failed to fetch session", 500);
  }
}
