import React, { memo, useState } from "react";
import { CiLogout } from "react-icons/ci";
import Todo from "./components/Todo/Todo";
import connectTodb from "../../utils/db";
import { verifyToekn } from "../../utils/auth";
import userModel from "../../models/user";
import todoModel from "../../models/todo";
import AddTodo from "./components/template/addTodo/AddTodo";
import { useQuery } from "@tanstack/react-query";
function HomePage({ todos, user }) {
  const {data} = useQuery()
  return (
    <div className="container mx-auto">
      <div className="pt-5 flex items-center justify-between">
        <div className="text-white">Welcome (^///^) amin 😍</div>
        <div>
          <div className="flex items-center gap-x-2 bg-red-700 text-white rounded-lg transition-all text-sm p-2 cursor-pointer hover:bg-red-800">
            <p className="">Log out</p>
            <CiLogout size={20} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <AddTodo />
      </div>

      <TodoContainer />
    </div>
  );
}

const TodoContainer = memo(() => {
  return (
    <div className="grid grid-cols-3 mt-5 gap-3">
      {/* {todos.map((todo) => ( */}
      <Todo />
      {/* ))} */}
    </div>
  );
});

export async function getServerSideProps(context) {
  connectTodb();

  const { token } = context.req.cookies;

  const getUser = verifyToekn(token);

  console.log(getUser);

  const user = await userModel.findOne({ email: getUser.email });

  console.log(user);

  const todos = await todoModel.find({ user: user._id });

  console.log(todos);

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default HomePage;
