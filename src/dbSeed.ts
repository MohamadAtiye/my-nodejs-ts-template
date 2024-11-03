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
  return DataSource.client.user.create({
    data: { ...ADMIN_USER },
  });
}

async function seed() {
  DataSource.initPrisma();
  await addUserTypes();
  await addUser();
}

seed();
