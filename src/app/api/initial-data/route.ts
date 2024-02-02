import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  console.log({ username });

  if (!username) {
    return NextResponse.json(
      { message: "Please provide username" },
      { status: 400 }
    );
  }

  const savedData = db.tasks.find((t) => t.username === username);

  if (!!savedData) {
    return NextResponse.json({ ...savedData }, { status: 200 });
  } else {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
}
