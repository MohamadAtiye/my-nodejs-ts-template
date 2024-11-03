import { DataSource } from "./services/services";

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
      DataSource.client.userType.upsert({
        where: { id: u.id },
        create: { ...u },
        update: { ...u },
      })
    )
  );
}

function addUser() {
  return DataSource.client.user.upsert({
    where: { id: ADMIN_USER.id },
    create: { ...ADMIN_USER },
    update: { ...ADMIN_USER },
  });
}

async function seed() {
  DataSource.initPrisma();
  await addUserTypes();
  await addUser();
}

seed();
