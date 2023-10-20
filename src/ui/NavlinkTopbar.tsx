import { NavLink } from "react-router-dom";

export const NavlinkTopbar = ({children,route}:{children:string,route:string}) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        isActive
          ? "text-[--main-font-color] font-bold"
          : "text-[--secundary-color] transition duration-200 hover:text-[--main-font-color]"
      }
    >
      {children}
    </NavLink>
  );
};
