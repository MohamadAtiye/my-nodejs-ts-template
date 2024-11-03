import { DataSource } from "./services";

export const findUserByUsername = async (username: string) => {
  return DataSource.client.user.findUnique({
    where: {
      username,
    },
  });
};

export const findUser = async (userId: string) => {
  return DataSource.client.user.findUnique({
    where: {
      id: userId,
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
