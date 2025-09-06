import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";

function Modal({ isModalOpen, setIsModalOpen, getAllTodoFunc }) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme(); // Get current theme

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, finish: false }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        getAllTodoFunc();
        setTitle("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      {/* Overlay */}
      <div className="bg-black/60 fixed inset-0"></div>

      {/* Modal container */}
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div
          className={`relative rounded-lg shadow-sm p-0 ${
            theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          } border`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t ${
              theme === "dark" ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Create Todo
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className={`end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ${
                theme === "dark" ? "dark:hover:bg-gray-600 dark:hover:text-white" : ""
              }`}
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Form */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={addTodo}>
              <div>
                <label
                  htmlFor="title"
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className={`outline-0 border text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Enter todo title"
                  required
                />
              </div>

              {/* Submit button */}
              {isLoading ? (
                <button
                  type="button"
                  disabled
                  className={`w-full cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white"
                      : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white"
                  }`}
                >
                  <BeatLoader color="white" size={13} />
                </button>
              ) : (
                <button
                  type="submit"
                  className={`w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white"
                      : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white"
                  }`}
                >
                  Create
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
