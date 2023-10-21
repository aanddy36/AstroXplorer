import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeSidebar } from "../features/Navbar/navbarSlice";

export const NavlinkSidebar = ({
  children,
  route,
}: {
  children: string;
  route: string;
}) => {
  const dispatch = useDispatch()
  return (
    <li onClick={() => dispatch(closeSidebar())}>
      <NavLink
        to={route}
        className={`block border-b border-[#7e7e7e3d] w-full py-2 transiton duration-200 px-[7%] hover:pr-[11%]`}
      >
        {children}
      </NavLink>
    </li>
  );
};
