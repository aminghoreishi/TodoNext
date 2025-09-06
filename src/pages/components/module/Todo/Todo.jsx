import React, { memo, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

const Todo = memo(({ title, _id, finish, getAllTodoFunc }) => {
  const [isChecked, setIsChecked] = useState(finish);

  // Function to handle the checkbox change
  const completeTodoFunc = async (e, id) => {
    const isChecked = e.target.checked; // Use the value directly from the checkbox
    setIsChecked(isChecked); // Update local state

    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ finish: isChecked }), // Send the updated finish value
      });

      if (res.ok) {
        console.log(`Todo ${id} updated successfully`);
        getAllTodoFunc(); // Optionally call to refresh todos after updating
      } else {
        console.error("Failed to update the todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodoFunc = async (id) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "DELETE", // DELETE method to remove the todo
      });

      if (res.ok) {
        console.log(`Todo ${id} deleted successfully`);
        getAllTodoFunc(); // Optionally call to refresh todos after deletion
      } else {
        console.error("Failed to delete the todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div
      className={`flex justify-between items-center border-b-2 pb-2 ${
        isChecked ? "opacity-50" : "opacity-100"
      } border-b-gray-300`}
    >
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => completeTodoFunc(e, _id)} // Trigger the update
          className="size-5"
        />
        <p>{title}</p>
      </div>

      <div className="flex items-center gap-x-2">
        {/* Edit Button (currently not implemented) */}
        <div className="cursor-pointer border-2 p-2 border-blue-700 rounded-lg text-blue-700 transition-all hover:bg-blue-700 hover:text-white">
          <MdOutlineModeEdit size={22} />
        </div>

        {/* Delete Button */}
        <div
          onClick={() => deleteTodoFunc(_id)} // Trigger delete
          className="cursor-pointer border-2 p-2 border-red-700 rounded-lg text-red-700 transition-all hover:bg-red-700 hover:text-white"
        >
          <CiTrash size={22} />
        </div>
      </div>
    </div>
  );
});

export default Todo;
