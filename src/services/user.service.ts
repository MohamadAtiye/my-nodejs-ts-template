import { DataSource } from "./services";

export const findUserByUsername = async (username: string) => {
  return DataSource.client.user.findUnique({
    where: {
      username,
    },
    include: {
      userOrganization: {
        include: {
          organization: true,
          userRole: true,
        },
      },
    },
  });
};

export const findUser = async (userId: string) => {
  return DataSource.client.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userOrganization: {
        include: {
          organization: true,
          userRole: true,
        },
      },
    },
  });
};

export const updateUserPassword = async (userId: string, password: string) => {
  return DataSource.client.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
};
