const { verifyToekn } = require("../../../../utils/auth");
const { default: connectTodb } = require("../../../../utils/db");

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }

  try {
    connectTodb();

    const { token } = req.cookies;

    if (!token) {
      return res.json({ mess: "" });
    }

    const tokenPayLoad = verifyToekn(token);

    const userFind = await userModel.findOne(
      { email: tokenPayLoad.email },
      "-_id firstName lastName role"
    );

    return res.status(200).json({ data: userFind });
  } catch (error) {}
};

export default handler;
