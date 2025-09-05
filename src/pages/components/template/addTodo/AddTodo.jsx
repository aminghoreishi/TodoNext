import React, { memo, useState } from "react";

const AddTodo = memo(() => {
  const [value, setValue] = useState("");

  const addTodo = async () => {
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: value, finish: false }),
    });

    console.log(res);
  };
  return (
    <>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-2 outline-0 w-full  p-2 rounded-lg text-white border-gray-400"
        />
      </div>
      <div className="flex justify-end">
        <button className="p-2 text-white cursor-pointer" onClick={addTodo}>
          Add Todo
        </button>
      </div>
    </>
  );
});

export default AddTodo;
