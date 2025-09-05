import userModel from "../../../../models/user";

const { default: connectTodb } = require("../../../../utils/db");

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectTodb();

    const { email, userName, password } = req.body;

    await userModel.create({ email, userName, password });

    return res.status(201).json({ mess: "create" });
  } catch (error) {}
};

export default handler;
