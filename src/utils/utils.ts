import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const generateId = () => {
  const randomUuid = uuidv4();
  return randomUuid;
};

const saltRounds = 10;

export function encrypt(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, saltRounds, function (err, hash) {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
}

export function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
}
