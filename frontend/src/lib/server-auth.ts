
import { auth } from "@/lib/auth";

export async function getAuthenticatedUser(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return null;
  }

  return session.user.id;
}
