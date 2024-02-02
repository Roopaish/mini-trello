import { clearSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  await clearSession();

  return NextResponse.json({ message: "You have been logged out" });
}
