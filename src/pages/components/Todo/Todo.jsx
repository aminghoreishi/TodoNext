import React, { memo } from "react";

const Todo =memo(({title}) => {
  return (
    <div className="h-[100px] border-2 rounded-lg p-2 text-white border-gray-400">
      {title}
    </div>
  );
})

export default Todo;
