import todoModel from "../../../../models/todo";
import connectTodb from "../../../../utils/db";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    connectTodb();
    const { id } = req.query;

    const deleteTodo = await todoModel.findOneAndDelete({ _id: id });

    if (deleteTodo) {
      return res.status(200).json({ message: "removed" });
    }
  }
};

export default handler;
