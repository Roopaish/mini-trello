import { users } from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const username: string = data?.username;
  const password: string = data?.password;

  if (!username) {
    return NextResponse.json(
      { message: "Please provide username" },
      { status: 400 }
    );
  }
  if (!password) {
    return NextResponse.json(
      { message: "Please provide password" },
      { status: 400 }
    );
  }

  const user = users.find((u) => u.username === username);

  if (!!user) {
    if (password === user.password) {
      setAuthCookie(username, password);

      return NextResponse.json({
        message: "Account already exists! Opening your old workspace.",
      });
    } else {
      return NextResponse.json(
        { message: "Password is wrong!" },
        { status: 400 }
      );
    }
  } else {
    users.push({ username, password });
    setAuthCookie(username, password);
    return NextResponse.json({
      message: "Account is created! Opening a new workspace for you!",
    });
  }
}

const setAuthCookie = (username: string, password: string) => {
  cookies().set(
    "session",
    `{"username":"${username}","password":"${password}"}`,
    {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24, // One day
      path: "/",
    }
  );
};
