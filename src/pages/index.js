import React from "react";
import connectTodb from "../../utils/db";
import { verifyToekn } from "../../utils/auth";
import userModel from "../../models/user";
import Navbar from "./components/Navbar/Navbar";

function HomePage({user}) {
  return (
    <>
    <Navbar user={user} />
    </>
  )
}

export async function getServerSideProps(context) {
  connectTodb();

  const { token } = context.req.cookies;

  const isValidToken = verifyToekn(token);

  const userFind = await userModel.findOne(
    { email: isValidToken.email },
    "-_id firstName lastName"
  );

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  console.log(userFind);
  

  return {
    props: {
      user: JSON.parse(JSON.stringify(userFind)),
    },
  };
}

export default HomePage;
