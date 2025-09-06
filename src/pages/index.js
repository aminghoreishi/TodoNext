import React, { useEffect, useState } from "react";
import SearchTodo from "./components/template/SearchTodo/SearchTodo";
import Todo from "./components/module/Todo/Todo";
import connectTodb from "../../utils/db";
import { verifyToekn } from "../../utils/auth";
import userModel from "../../models/user";
import todoModel from "../../models/todo";
import { IoAddOutline } from "react-icons/io5";
import Modal from "./components/module/Modal/Modal";
import { useTheme } from "next-themes";

function HomePage({ todos }) {
  const [allTodo, setAllTodo] = useState([...todos]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoPageintion, setTodoPageintion] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const numberTodo = 5;

  let li = Math.ceil(allTodo.length / numberTodo);

  const getAllTodoFunc = async () => {
    const res = await fetch("/api/todo");
    const response = await res.json();

    setAllTodo(response);
  };

  useEffect(() => {
    let endIndex = numberTodo * currentPage;
    let startIndex = endIndex - numberTodo;

    const arrSlice = allTodo.slice(startIndex, endIndex);

    setTodoPageintion(arrSlice);
  }, [currentPage, allTodo]);

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        getAllTodoFunc={getAllTodoFunc}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="container mx-auto ">
        <div className="text-center pt-5">
          <p>Todo List</p>
        </div>
        <SearchTodo />

        <div className="flex flex-col gap-5 mt-5 lg:px-20">
          {todoPageintion.map((todo) => (
            <Todo {...todo} />
          ))}
        </div>

        <ul className="flex items-center justify-center mt-5 gap-x-3">
          {Array.from({ length: li }).map((_, index) => (
            <li
              className={`size-8 ${
                index + 1 === currentPage ? "bg-purple-800" : "bg-slate-800 "
              } rounded-full flex items-center justify-center text-black dark:text-white cursor-pointer`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <div className="fixed bottom-3 right-70">
          <div
            onClick={() => setIsModalOpen((pre) => !pre)}
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

  console.log(getUser);

  const userFind = await userModel.findOne({ email: getUser.email });

  console.log(userFind);

  const todos = await todoModel.find({ user: userFind._id }, "-__v");

  console.log(todos);

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };

  // const userFind = await userModel.findOne({})
}

export default HomePage;
