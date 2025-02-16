import jwt, { SignOptions } from "jsonwebtoken";

type TUserSecret = {
  id: object;
  userRole: "admin" | "user";
};

const createToken = (
  userSecret: TUserSecret,
  privateKey: string | Buffer,
  expiresDate: string | number
): string => {
  const token = jwt.sign(userSecret, privateKey, {
    expiresIn: expiresDate as SignOptions["expiresIn"],
  });

  return token;
};

export default createToken;
