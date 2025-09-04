
import { serialize } from "cookie";
import userModel from "../../../../models/user";
import { genarationToken, verifyPassword } from "../../../../utils/auth";
import connectTodb from "../../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
     connectTodb();
    const { identifier, password } = req.body;

    // بررسی وجود فیلدهای ضروری
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

    const token = genarationToken({ email: userFind.email });

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
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default handler;
