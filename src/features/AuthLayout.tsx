import { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
        console.log("AAAA");
        
      navigate(-1);
    }
    console.log("BBBBBB");
    
  },[isLoggedIn]);
  return <Outlet />;
};