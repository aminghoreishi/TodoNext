import React, { useEffect, useState, useMemo } from "react";
import SearchTodo from "./components/template/SearchTodo/SearchTodo";
import Todo from "./components/module/Todo/Todo";
import connectTodb from "../../utils/db";
import { verifyToekn } from "../../utils/auth";
import userModel from "../../models/user";
import todoModel from "../../models/todo";
import { IoAddOutline } from "react-icons/io5";
import Modal from "./components/module/Modal/Modal";

function HomePage({ todos }) {
  const [allTodo, setAllTodo] = useState([...todos]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTodo, setFilterTodo] = useState("all");
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");

  // Function to fetch all todos and update the state
  const getAllTodoFunc = async (page, filter, searchQuery) => {
    const res = await fetch(`/api/todo/?page=${page}&filter=${filter}`);
    const response = await res.json();

    let filteredTodos = response.todos;

    // اگر جستجو وارد شده باشد، داده‌ها را فیلتر می‌کنیم
    if (searchQuery) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()) // جستجو در عنوان todo
      );
    }

    setAllTodo(filteredTodos); //ر شده
    setTotalPages(response.totalPages); // تعداد صفحات را به‌روزرسانی می‌کنیم
  };

  useEffect(() => {
    getAllTodoFunc(currentPage, filterTodo, search);
  }, [currentPage, filterTodo, search]); //
  // Handle pagination
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        getAllTodoFunc={getAllTodoFunc} // Make sure it's passed to the modal to fetch latest todos
        setIsModalOpen={setIsModalOpen}
      />
      <div className="container mx-auto">
        <div className="text-center pt-5">
          <p>Todo List</p>
        </div>
        <SearchTodo
          setFilterTodo={setFilterTodo}
          search={search}
          setSearch={setSearch}
        />

        <div className="flex flex-col gap-5 mt-5 lg:px-20">
          {allTodo.map((todo) => (
            <Todo {...todo} getAllTodoFunc={getAllTodoFunc} key={todo._id} />
          ))}
        </div>

        <ul className="flex items-center justify-center mt-5 gap-x-3">
          {/* Pagination */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`size-8 ${
                index + 1 === currentPage ? "bg-purple-800" : "bg-slate-800"
              } rounded-full flex items-center justify-center text-black dark:text-white cursor-pointer`}
              onClick={() => handlePaginationClick(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>

        <div className="fixed bottom-5 right-5">
          {" "}
          {/* Fixed positioning with responsive right */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-500 text-white size-12 rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoAddOutline size={23} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  connectTodb();
  const { token } = context.req.cookies;

  const getUser = verifyToekn(token);

  const userFind = await userModel.findOne({ email: getUser.email });

  const todos = await todoModel.find({ user: userFind._id }, "-__v");

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}

export default HomePage;
