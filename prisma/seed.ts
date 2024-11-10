// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USER_TYPES = [
  {
    id: 1,
    label: "Admin",
  },
  {
    id: 2,
    label: "Standard",
  },
];

const ADMIN_USER = {
  id: "92da2876-be63-45eb-8c07-4d4a773037a8",
  username: "admin@mail.com",
  password: "$2a$10$Yvc.jWLQ088.HoE1aOA9QuuYNEF7mY/ju9E1oyw8g8tYcMYooERge", //"password1"
  isPhone: false,
  fName: "fNameAdmin",
  lName: "lNameAdmin",
  userTypeId: 1,
};

function addUserTypes() {
  return Promise.all(
    USER_TYPES.map((u) =>
      prisma.userType.upsert({
        where: { id: u.id },
        create: { ...u },
        update: { ...u },
      })
    )
  );
}

function addUser() {
  return prisma.user.upsert({
    where: { id: ADMIN_USER.id },
    create: { ...ADMIN_USER },
    update: { ...ADMIN_USER },
  });
}

async function main() {
  await addUserTypes();
  await addUser();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
