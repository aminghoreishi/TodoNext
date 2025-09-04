import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashPass = await hash(password, 12);
  return hashPass;
};

const genarationToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return token;
};

const verifyPassword = async (password, hash) => {
  const isValid = await compare(password, hash);
  return isValid;
};

const verifyToekn = (token) => {
  try {
    const validateResult = verify(token, process.env.privateKey);
    return validateResult;
  } catch (error) {}
};

export { hashPassword, genarationToken, verifyPassword , verifyToekn };
