import prisma from "@/lib/prisma"

export async function gainXP(userId: string, amount: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  let xp = user.xp + amount
  let level = user.level
  let requiredXP = getRequiredXP(level + 1)

  while (xp >= requiredXP) {
    xp -= requiredXP
    level++
    requiredXP = getRequiredXP(level + 1)
  }

  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: { xp, level },
  })

  return { xp, level }
}

function getRequiredXP(level: number) {
  return Math.round(Math.pow(level, 1.8) + level * 4)
}
