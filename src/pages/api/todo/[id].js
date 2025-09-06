import todoModel from "../../../../models/todo";
import connectTodb from "../../../../utils/db";

const handler = async (req, res) => {
  const { id } = req.query;

  // Connect to the database
  connectTodb();

  try {
    if (req.method === "DELETE") {
      // Delete the todo by its _id
      const deleteTodo = await todoModel.findOneAndDelete({ _id: id });

      if (!deleteTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json({ message: "Todo removed successfully" });
    }

    if (req.method === "PATCH") {
      const { finish } = req.body;

      // Validate request body
      if (finish === undefined) {
        return res.status(400).json({ message: "Missing 'finish' field" });
      }

      // Update the todo's finish status
      const todoUpdate = await todoModel.findOneAndUpdate(
        { _id: id },
        { finish },
        { new: true } // Return the updated document
      );

      if (!todoUpdate) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res
        .status(200)
        .json({ message: "Todo updated successfully", todo: todoUpdate });
    }

    // Handle unsupported methods
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default handler;
