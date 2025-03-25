import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RequiredAuth = () => {
 
  const user = useSelector((state) => state.user?.user?.token)
  //required authantication for many pages
  return user ? <Outlet /> : <Navigate to="/auth/signIn" />;
};

export default RequiredAuth;
