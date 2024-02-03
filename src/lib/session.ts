import db from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSessionData() {
  const sessionData = cookies().get("session")?.value ?? "{}";
  console.log({ sessionData });
  const data: { username?: string; password?: string } =
    JSON.parse(sessionData);

  console.log({ data });
  return data;
}

export async function clearSession() {
  cookies().delete("session");
  redirect("/");
}

export async function isUserAuthenticated() {
  const data = await getSessionData();

  console.log({ data });
  if (!!data?.username && !!data?.password) {
    const user = db.users.find((u) => u.username === data?.username);
    console.log({ user });

    if (!!user) {
      if (data?.password === user.password) {
        console.log({ password: data?.password });
        return true;
      }
    }
  }

  return false;
}
