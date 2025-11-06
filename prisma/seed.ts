import prisma from "@/lib/prisma";


async function main() {
  const races = [
    { name: "Human" },
    { name: "Elf" },
    { name: "Dwarf" },
    { name: "Halfling" },
  ];

  const classes = ["Fighter", "Cleric", "Wizard", "Rogue"];

  for (const race of races) {
    await prisma.race.upsert({
      where: { name: race.name },
      update: {},
      create: race,
    });
  }

  for (const name of classes) {
    await prisma.class.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeded races and classes");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
