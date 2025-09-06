import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

function SearchTodo({ setFilterTodo , search , setSearch }) {
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
      <div className="flex items-center gap-5 justify-between">
        <div className="grow">
          <input
            type="text"
            value={search}
            onChange={(e) =>setSearch(e.target.value)}
            placeholder="Search Note"
            className="rounded-lg p-2 outline-0 border-2 w-full border-purple-500"
          />
        </div>
        <div>
          <select
            onChange={(e) => setFilterTodo(e.target.value)}
            className="dark:bg-slate-900 p-2 rounded-lg border-2 dark:border-gray-500"
          >
            <option value="all">ALL</option>
            <option value="Com">Complete</option>
            <option value="unCom">Uncomplete</option>
          </select>
        </div>
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <IoMoonOutline size={20} />
          ) : (
            <IoSunnyOutline size={20} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchTodo;
