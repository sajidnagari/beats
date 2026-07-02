import { jsonOk } from "@/lib/api-response";
import { withApiRoute } from "@/lib/api-route";
import { clearSession } from "@/lib/session";

export async function POST() {
  return withApiRoute(async () => {
    await clearSession();
    return jsonOk({ success: true });
  });
}
