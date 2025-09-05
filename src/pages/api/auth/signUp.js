import userModel from "../../../../models/user";
import connectTodb from "../../../../utils/db";
import { hashPassword, generationToken } from "../../../../utils/auth";
const cookie = require("cookie");
const handler = async (req, res) => {
  if (req.method !== "POST") return;

  try {
    connectTodb();

    const { email, password, userName } = req.body;

    const isUserFind = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserFind) {
      return res.status(409).json({
        mes: "this usermane is exits please use another email or userNmae",
      });
    }

    const hashPass = await hashPassword(password);

    const token = await generationToken({ email });

    await userModel.create({ email, password: hashPass, userName });

    return res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      )
      .json({ mes: "create", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
