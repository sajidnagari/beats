import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { settingsSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid settings data", 400);

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(parsed.data.name ? { name: parsed.data.name } : {}),
        ...(parsed.data.email ? { email: parsed.data.email } : {}),
      },
      select: { id: true, email: true, name: true, plan: true },
    });

    return jsonOk({ user });
  } catch {
    return jsonError("Failed to update settings", 500);
  }
}
