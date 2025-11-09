// /lib/leaderboard.ts
import prisma from "@/lib/prisma";

export async function getLeaderboard(limit = 20) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      level: true,
      xp: true,
      badges: { select: { id: true } },
      race: { select: { name: true } },
      class: { select: { name: true } },
    },
    orderBy: [
      { level: "desc" },
      { xp: "desc" },
    ],
    take: limit,
  });

  // optional: add rank numbers
  return users.map((u, i) => ({
    rank: i + 1,
    username: u.username,
    race: u.race?.name,
    class: u.class?.name,
    level: u.level,
    xp: u.xp,
    badges: u.badges.length,
  }));
}
