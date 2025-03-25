import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { baseU } from "./confing";
import "./index.css";
import { refresh } from "./rtk/slices/user-slice";
import { useEffect } from "react";
import Loading from "./Loading";

const Refresh = () => {
  const baseUrl = baseU();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  //refresh token
  useEffect(() => {
   const timer= setTimeout(() => {
  if (cookie.get("token")) {
    const token=cookie.get("token")
      cookie.remove("token")
      cookie.remove("rule")
    //if there is an old token refresh
    dispatch(
      refresh({
        baseUrl: baseUrl,
        token: token,
      })
    
    ).then((res) => {
      if (res.error) {
        if (res.payload.response.status == 401) {
          nav("/auth/signin");
        }
      }
      setLoading(false);
  
    });
  } else {
    setLoading(false);
  }
}, 800);
  return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center h-full ">
      {loading == true ? <Loading /> : <Outlet />}
    </div>
  );
};

export default Refresh;
