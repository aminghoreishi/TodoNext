import { serialize } from "cookie";
import userModel from "../../../../models/user";
import { generationToken, verifyPassword } from "../../../../utils/auth";
import connectTodb from "../../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    connectTodb();

    const { identifier, password } = req.body;

    console.log(req.body);

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Identifier and password are required" });
    }

    const userFind = await userModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!userFind) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await verifyPassword(password, userFind.password);

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "Username or password is not correct" });
    }

    const token = await generationToken({ email: userFind.email });

    const serializedCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return res
      .setHeader("Set-Cookie", serializedCookie)
      .status(200)
      .json({ message: "Login successful", token });
  } catch (error) {
    return res.json({ mes: error.message });
  }
}
