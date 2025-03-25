import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const RequiredAuth = () => {
  const cookie=new Cookies()
  const user = useSelector((state) => state.user?.user?.token)|cookie.get("token")
  //required authantication for many pages
  return user ? <Outlet /> : <Navigate to="/auth/signIn" />;
};

export default RequiredAuth;
