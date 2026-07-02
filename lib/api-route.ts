import { NextResponse } from "next/server";

type MappedError = {
  message: string;
  status: number;
  code: string;
};

export function mapApiError(error: unknown): MappedError {
  if (error instanceof Error) {
    if (error.message.includes("AUTH_SECRET")) {
      return {
        message: "Server auth is not configured. Add AUTH_SECRET in Vercel environment variables.",
        status: 500,
        code: "AUTH_CONFIG",
      };
    }

    if (error.message.includes("DATABASE_URL")) {
      return {
        message: "Database is not configured. Add DATABASE_URL in Vercel environment variables.",
        status: 500,
        code: "DB_CONFIG",
      };
    }
  }

  if (typeof error === "object" && error !== null && "code" in error) {
    const code = String((error as { code: string }).code);

    if (code === "P1001") {
      return {
        message: "Cannot reach database. Verify DATABASE_URL, SSL mode, and that the DB is online.",
        status: 503,
        code,
      };
    }

    if (code === "P2021" || code === "P2022") {
      return {
        message: "Database tables are missing. Run npm run db:push and npm run db:seed on production DB.",
        status: 503,
        code,
      };
    }
  }

  return {
    message: "Something went wrong on the server. Please try again in a moment.",
    status: 500,
    code: "INTERNAL_ERROR",
  };
}

export async function withApiRoute(handler: () => Promise<NextResponse>) {
  try {
    return await handler();
  } catch (error) {
    console.error("[API]", error);
    const mapped = mapApiError(error);
    return NextResponse.json(
      { error: mapped.message, code: mapped.code },
      { status: mapped.status },
    );
  }
}
