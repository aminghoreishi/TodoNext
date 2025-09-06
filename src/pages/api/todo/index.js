import connectToDb from "../../../../utils/db";
import todoModel from "../../../../models/todo";
import { verifyToekn } from "../../../../utils/auth";
import userModel from "../../../../models/user";

const handler = async (req, res) => {
  connectToDb();

  const cookie = req.cookies;

  if (!cookie || !cookie.token) {
    console.log("No token found");
    return res.status(401).json({ message: "توکن احراز هویت یافت نشد" });
  }

  let getUser;
  try {
    getUser = verifyToekn(cookie.token);
    console.log("Decoded token:", getUser);
  } catch (error) {
    console.log("Token verification failed:", error);
    return res.status(401).json({ message: "توکن نامعتبر" });
  }

  const findUser = await userModel.findOne({ email: getUser.email });
  if (req.method === "POST") {
    try {
      const { title, finish } = req.body;

      if (!findUser) {
        console.log("User not found");
        return res.status(404).json({ message: "کاربر یافت نشد" });
      }

      const newTodo = await todoModel.create({
        title,
        finish,
        user: findUser._id,
      });

      console.log("Todo created successfully:", newTodo);

      return res.status(201).json({
        message: "Todo با موفقیت ایجاد شد",
        todo: newTodo,
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    const { page = 1, filter = "all" } = req.query;

    const numberTodo = 5;

    const skip = (page - 1) * numberTodo;

    let filterQuery = {};

    if (filter === "Com") {
      filterQuery = { finish: true };
    } else if (filter === "unCom") {
      filterQuery = { finish: false };
    }

    const todos = await todoModel
      .find({ user: findUser._id, ...filterQuery })
      .skip(skip)
      .limit(numberTodo);

    const totalTodo = await todoModel.countDocuments({
      user: findUser._id,
      ...filterQuery,
    });

    const totalPages = Math.ceil(totalTodo / numberTodo);

    return res.json({ todos, totalPages });
  } else {
    return res.status(405).json({ message: "متد غیرمجاز" });
  }
};

export default handler;
