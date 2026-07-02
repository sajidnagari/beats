import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { settingsSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest) {
  return withApiRoute(async () => {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401, "UNAUTHORIZED");

    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid settings data", 400, "VALIDATION_ERROR");

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(parsed.data.name ? { name: parsed.data.name } : {}),
        ...(parsed.data.email ? { email: parsed.data.email } : {}),
      },
      select: { id: true, email: true, name: true, plan: true },
    });

    return jsonOk({ user });
  });
}
