import db from "@/db";
import { getSessionData } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const title = body?.title;
  const id = body?.id;
  const tasks = body?.tasks;
  console.log({ tasks });

  const doesTaskExist = tasks && tasks.length > 0;
  console.log({ doesTaskExist, title, id, tasks });

  if (!doesTaskExist) {
    if (!title) {
      return NextResponse.json(
        { message: "Please provide the title" },
        { status: 400 }
      );
    }

    const { username } = await getSessionData();

    const userIndex = db.tasks.findIndex((user) => user.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" });
    }

    db.tasks[userIndex].tasks.push({
      id: id,
      status: "TODO",
      title,
      description: title,
    });

    return NextResponse.json({ message: "Added new task" });
  } else {
    const { username } = await getSessionData();

    const userIndex = db.tasks.findIndex((user) => user.username === username);
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" });
    }

    db.tasks[userIndex].tasks = tasks;

    return NextResponse.json({ message: "Added all tasks" });
  }
}
