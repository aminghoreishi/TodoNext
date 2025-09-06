import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
function Todo({title}) {
  return (
    <div className="flex justify-between items-center border-b-2 pb-2 border-b-gray-300">
      <div className="flex items-center gap-x-2">
        <input type="checkbox"  className="size-5" name="" id="" />
        <p>{title}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="cursor-pointer">
          <MdOutlineModeEdit size={21}  />
        </div>
        <div className="cursor-pointer">
          <CiTrash  size={21} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
