import { getUser } from "@/db/client";

export async function checkAuth() {
  const user = await getUser();
  return Boolean(user);
}
