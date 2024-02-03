import db from "@/db";
import { getSessionData } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const title = body?.title;
  const id = body?.id;
  const columns = body?.columns;

  if (!columns) {
    if (!title) {
      return NextResponse.json(
        { message: "Please provide the title" },
        { status: 400 }
      );
    }

    const { username } = await getSessionData();

    const userIndex = (await db).data.tasks.findIndex(
      (user) => user.username === username
    );
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" });
    }

    (await db).data.tasks[userIndex].columns.push({
      id: id,
      title,
    });

    return NextResponse.json({ message: "Added new column" });
  } else {
    const { username } = await getSessionData();

    const userIndex = (await db).data.tasks.findIndex(
      (user) => user.username === username
    );
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" });
    }

    (await db).data.tasks[userIndex].columns = columns;

    return NextResponse.json({ message: "Added all columns" });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const colId = body?.id;

  if (!colId) {
    return NextResponse.json(
      { message: "Please provide the column id" },
      { status: 400 }
    );
  }

  const { username } = await getSessionData();

  const userIndex = (await db).data.tasks.findIndex(
    (user) => user.username === username
  );
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" });
  }

  (await db).data.tasks[userIndex].columns = (await db).data.tasks[
    userIndex
  ].columns.filter((col) => col.id !== colId);

  return NextResponse.json({ message: "Removed column" });
}
