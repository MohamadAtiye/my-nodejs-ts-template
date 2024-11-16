// prisma/seed.ts
import {
  organization,
  PrismaClient,
  user,
  userOrganization,
  userRole,
} from "@prisma/client";
const prisma = new PrismaClient();

type meta = "isDeleted" | "createdTs" | "updatedTs";

const USER_ROLES: Omit<userRole, meta>[] = [
  {
    id: 1,
    label: "Admin",
  },
  {
    id: 2,
    label: "Standard",
  },
];

const ORGANIZATION: Omit<organization, meta> = {
  id: 1,
  name: "Organization",
  description: "Organization description",
};

const ADMIN_USER: Omit<user, meta> = {
  id: "92da2876-be63-45eb-8c07-4d4a773037a8",
  username: "admin@mail.com",
  password: "$2a$10$Yvc.jWLQ088.HoE1aOA9QuuYNEF7mY/ju9E1oyw8g8tYcMYooERge", //"password1"
  isPhone: false,
  fName: "fNameAdmin",
  lName: "lNameAdmin",
  profilePicUrl: "",
  isGlobalAdmin: true,
  passwordExpireDate: null,
  shouldChangePassword: false,
};

const USER_ORGANIZATION: Omit<userOrganization, meta> = {
  id: 1,
  userId: ADMIN_USER.id,
  organizationId: ORGANIZATION.id,
  userRoleId: USER_ROLES[0].id,
};

function addUserTypes() {
  return Promise.all(
    USER_ROLES.map((u) =>
      prisma.userRole.upsert({
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

function addOrganization() {
  return prisma.organization.upsert({
    where: { id: ORGANIZATION.id },
    create: { ...ORGANIZATION },
    update: { ...ORGANIZATION },
  });
}

function addUserOrganization() {
  return prisma.userOrganization.upsert({
    where: { id: USER_ORGANIZATION.id },
    create: { ...USER_ORGANIZATION },
    update: { ...USER_ORGANIZATION },
  });
}

async function main() {
  await addUserTypes();
  await addUser();
  await addOrganization();
  await addUserOrganization();
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
