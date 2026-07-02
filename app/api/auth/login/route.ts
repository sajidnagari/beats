import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  return withApiRoute(async () => {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid email or password", 400, "VALIDATION_ERROR");

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) return jsonError("Invalid credentials", 401, "INVALID_CREDENTIALS");

    const valid = await bcrypt.compare(parsed.data.password, user.password);
    if (!valid) return jsonError("Invalid credentials", 401, "INVALID_CREDENTIALS");

    await createSession({ userId: user.id, email: user.email, name: user.name });

    return jsonOk({
      user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
    });
  });
}
