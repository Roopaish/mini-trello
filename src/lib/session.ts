import { users } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSessionData() {
  const sessionData = cookies().get("session")?.value ?? "{}";
  const data: { username?: string; password?: string } =
    JSON.parse(sessionData);

  return data;
}

export async function clearSession() {
  cookies().delete("session");
  redirect("/");
}

export async function isUserAuthenticated() {
  const data = await getSessionData();

  if (!!data?.username && !!data?.password) {
    const user = users.find((u) => u.username === data?.username);

    if (!!user) {
      if (data?.password === user.password) {
        return true;
      }
    }
  }

  return false;
}
