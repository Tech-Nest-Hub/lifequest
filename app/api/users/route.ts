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
      age: true,
    },
  });
  return NextResponse.json(users);
}

// POST /api/users - create a new user
export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password, raceId, classId, subraceId } = body;

  if (!username || !email || !password || !raceId || !classId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password, // TODO: hash in production
      raceId,
      classId,
      subraceId: subraceId || null,
    },
  });

  return NextResponse.json(newUser);
}
