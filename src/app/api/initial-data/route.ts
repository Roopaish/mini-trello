import db from "@/db";
import { getSessionData } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { username } = await getSessionData();

  if (!username) {
    return NextResponse.json({ message: "Please login" }, { status: 400 });
  }

  const savedData = (await db).data.tasks.find((t) => t.username === username);

  if (!!savedData) {
    return NextResponse.json({ ...savedData }, { status: 200 });
  } else {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
}
