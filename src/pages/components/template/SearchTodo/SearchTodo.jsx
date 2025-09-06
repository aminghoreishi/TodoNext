import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
function SearchTodo() {
  const { theme, setTheme } = useTheme();

   const [mounted, setMounted] = useState(false);
  
    // Use effect to ensure theme is set after the component has mounted
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      // If not mounted, return null to prevent mismatch
      return null;
    }
  return (
    <div className="mt-3">
      <div className="flex items-center max-lg:gap-3 justify-between">
        <div className="grow">
          <input
            type="text"
            placeholder="Search Note"
            className="rounded-lg p-2 outline-0 border-2 max-lg:w-full lg:w-[700px] border-purple-500"
          />
        </div>
        <div className="">
          <select name="" id="">
            <option value="">ALL</option>
          </select>
        </div>
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
        </div>
      </div>
    </div>
  );
}

export default SearchTodo;
