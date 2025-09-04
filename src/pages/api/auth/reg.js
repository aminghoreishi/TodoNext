import userModel from "../../../../models/user";
import { genarationToken, hashPassword } from "../../../../utils/auth";
import connectTodb from "../../../../utils/db";
const cookie = require("cookie");
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectTodb();

    const { firstName, lastName, email, password, userName } = req.body;

    const isUserFind = await userModel.findOne({
      $or: [{ userName }, { email }], //*  دنبال یوزر نیم یا ایمیل بگرد
    });

    if (isUserFind) {
      return res.status(409).json({
        mes: "this usermane is exits please use another email or userNmae",
      });
    }

    const passwordHash = await hashPassword(password);

    const token = genarationToken({ email });

    await userModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      userName,
    });

    return res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      ).status(201)
      .json({ mes: "create it", token });
  } catch (error) {}
};

export default handler;
