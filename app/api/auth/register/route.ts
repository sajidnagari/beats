import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { jsonError, jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { registerSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  return withApiRoute(async () => {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid registration data", 400, "VALIDATION_ERROR");

    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) return jsonError("Email already registered", 409, "EMAIL_EXISTS");

    const hashed = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashed,
        plan: "Starter",
      },
    });

    await createSession({ userId: user.id, email: user.email, name: user.name });

    return jsonOk(
      {
        user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
      },
      201,
    );
  });
}
