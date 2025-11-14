import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/users - list all users
export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      level: true,
      xp: true,
      health: true,
      energy: true,
      skills: true,
      money: true,
    },
  });
  return NextResponse.json(users);
}
