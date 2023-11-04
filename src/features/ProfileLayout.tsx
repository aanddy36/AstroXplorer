import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProfileLayout = () => {
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/login");
  }
  return <Outlet />;
};
